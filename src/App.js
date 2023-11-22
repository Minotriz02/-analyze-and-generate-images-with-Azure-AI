import React, { useState } from "react";
import analyzeImage from "./azure-image-analysis";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null); // Initialize response as null

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleImageGeneration = () => {
    if (inputValue.startsWith("http")) {
      console.log("Image generation triggered");
    }
  };

  const handleImageAnalysis = async () => {
    if (inputValue.startsWith("http")) {
      setIsLoading(true);
      const data = await analyzeImage(inputValue);
      setResponse(data);
      setIsLoading(false);
    }
    console.log("Image analysis triggered");
  };

  return (
    <div>
      <h1>Image Analysis and Generation</h1>
      <label>
        Image URL / Prompt:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleImageAnalysis}>Analyze Image</button>
      <button onClick={handleImageGeneration}>Generate Image</button>
      {isLoading && <p>Loading...</p>}
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
