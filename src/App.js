import React, { useEffect, useState } from "react";
import { analyzeImage, isConfiguredAnalysis } from "./azure-image-analysis";
import {
  generateImage,
  isConfiguredGeneration,
} from "./azure-image-generation";
import "./App.css";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { IconAlertCircle } from "@tabler/icons-react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState(null); // Initialize response as null
  const [responseGenerated, setResponseGenerated] = useState(null); // Initialize response as null
  const [analysisValidation, setAnalysisValidation] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showGenerated, setShowGenerated] = useState(false);
  const [modalError, setModalError] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleImageGeneration = async () => {
    setShowGenerated(true);
    const data = await generateImage(inputValue).catch((error) => {
      setModalError(true);
    });
    setResponse(null);
    setResponseGenerated(data);
    setShowGenerated(false);
  };

  const handleImageAnalysis = async () => {
    if (inputValue === "" || !inputValue.startsWith("http")) {
      setAnalysisValidation(false);
    } else if (inputValue.startsWith("http")) {
      setAnalysisValidation(true);
      setShowAnalysis(true);
      const data = await analyzeImage(inputValue).catch((error) => {
        setModalError(true);
      });
      if (data) {
        data.imgUrl = inputValue;
      }
      setResponseGenerated(null);
      setResponse(data);
      setShowAnalysis(false);
    }
  };
  
  return isConfiguredGeneration() && isConfiguredAnalysis() ? (
    <div>
      <Modal show={modalError} centered onHide={() => setModalError(false)}>
        <Modal.Body className="d-flex align-items-center bg-danger text-bg-danger rounded-2 ">
          <IconAlertCircle size={60} className="me-2" />
          An error occurred while processing your request, please try again or
          try another url or image
        </Modal.Body>
      </Modal>
      <Modal show={showAnalysis} backdrop="static" keyboard={false} centered>
        <Modal.Body className="d-flex align-items-center ">
          <Spinner animation="border" variant="primary" className="me-2" />
          Your image is being analyzed, please wait a moment...
        </Modal.Body>
      </Modal>
      <Modal show={showGenerated} backdrop="static" keyboard={false} centered>
        <Modal.Body className="d-flex align-items-center ">
          <Spinner animation="border" variant="primary" className="me-2" />
          Your image is being generated, please wait a moment...
        </Modal.Body>
      </Modal>
      <h1>VisionForge</h1>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Image URL / Prompt:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="url or image to generate"
            value={inputValue}
            onChange={handleInputChange}
            className={`${!analysisValidation ? "border-danger " : ""}}`}
          />
          {!analysisValidation && (
            <label className="text-danger fs-6 mt-1">
              Please a valid URL to a image
            </label>
          )}
        </Form.Group>
        <Button onClick={handleImageAnalysis} className="me-2">
          Analyze Image
        </Button>
        <Button className="glow-on-hover" onClick={handleImageGeneration}>
          Generate Image
        </Button>
      </Form>
      <br />
      {response && (
        <div>
          <h2>Response</h2>
          <p>{response.captionResult.text}</p>
          <img src={response.imgUrl} alt="analyzed" className="img-generated" />
        </div>
      )}

      {responseGenerated && (
        <div>
          <h2>Generated Image</h2>
          <img
            src={responseGenerated.data[0].url}
            alt="Generated"
            className="img-generated"
          />
        </div>
      )}
    </div>
  ) : (
    <h1>Not configured</h1>
  );
}

export default App;
