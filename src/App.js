import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleImageAnalysis = () => {
    if (inputValue.startsWith('http')) {
      setImageUrl(inputValue);
      setPrompt('');
    } else {
      setPrompt(inputValue);
      setImageUrl('');
    }
    console.log('Image analysis triggered');
  };

  const handleImageGeneration = () => {
    if (inputValue.startsWith('http')) {
      setImageUrl(inputValue);
      setPrompt('');
    } else {
      setPrompt(inputValue);
      setImageUrl('');
    }
    console.log('Image generation triggered');
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
    </div>
  );
}

export default App;
