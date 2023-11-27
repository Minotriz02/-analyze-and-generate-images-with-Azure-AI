import React, { useState } from "react";
import { analyzeImage, isConfiguredAnalysis } from "./azure-image-analysis";
import {
  generateImage,
  isConfiguredGeneration,
} from "./azure-image-generation";
import "./App.css";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null); // Initialize response as null
  const [responseGenerated, setResponseGenerated] = useState(null); // Initialize response as null
  const [analysisValidation, setAnalysisValidation] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleImageGeneration = async () => {
    setIsLoading(true);
    const data = await generateImage(inputValue);
    setResponseGenerated(data);
    setIsLoading(false);
  };

  const handleImageAnalysis = async () => {
    if (inputValue === "" || !inputValue.startsWith("http")) {
      setAnalysisValidation(false);
    } else if (inputValue.startsWith("http")) {
      setAnalysisValidation(true);
      setShowAnalysis(true);
      const data = await analyzeImage(inputValue);
      setResponse(data);
      setShowAnalysis(false);
    }
  };

  return isConfiguredGeneration() && isConfiguredAnalysis() ? (
    <div>
      <Modal show={showAnalysis} backdrop="static" keyboard={false} centered>
        <Modal.Body className="d-flex align-items-center ">
          <Spinner animation="border" variant="primary" className="me-2" />
          Your image are being analyzed, please wait a moment...
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
        <Button
          onClick={handleImageAnalysis}
          accordion-collapse
          className="me-2"
        >
          Analyze Image
        </Button>
        <button class="glow-on-hover" onClick={handleImageGeneration}>
          Generate Image
        </button>
      </Form>
      <br />

      {isLoading && <p>Loading...</p>}
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
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
          <pre style={{ maxWidth: "500px" }}>
            {JSON.stringify(responseGenerated, null, 2)}
          </pre>
        </div>
      )}
    </div>
  ) : (
    <h1>Not configured</h1>
  );
}

export default App;
