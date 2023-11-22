
// Import the necessary libraries
import axios from "axios";

// Function to generate an image using the OpenAI API
async function generateImage(prompt) {
  try {
    // Make a POST request to the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt: prompt
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_GENERATE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Extract the URL of the generated image from the response
    const imageUrl = response.data;

    // Return the URL of the generated image
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export default generateImage;