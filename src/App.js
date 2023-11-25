import React, { useState } from "react";
import { analyzeImage, isConfiguredAnalysis } from "./azure-image-analysis";
import {
  generateImage,
  isConfiguredGeneration,
} from "./azure-image-generation";
import "./App.css";
import { Button, Form } from "react-bootstrap";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null); // Initialize response as null
  const [responseGenerated, setResponseGenerated] = useState(null); // Initialize response as null

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
    if (inputValue.startsWith("http")) {
      setIsLoading(true);
      const data = await analyzeImage(inputValue);
      setResponse(data);
      setIsLoading(false);
    }
  };

  return isConfiguredGeneration() && isConfiguredAnalysis() ? (
    <div>
      <h1>VisionForge</h1>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Image URL / Prompt:</Form.Label>
          <Form.Control
            type="text"
            placeholder="url or image to generate"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
      <br />
      <Button onClick={handleImageAnalysis} className="me-2">Analyze Image</Button>
      <Button onClick={handleImageGeneration}>Generate Image</Button>
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
            alt="Generated image"
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
