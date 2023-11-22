// Import the necessary libraries
import axios from "axios";

// Function to check if the AI service is configured
function isConfiguredAnalysis() {
  // Check if the necessary environment variables are set
  const generateKey = process.env.REACT_APP_API_KEY;

  // Return true if all environment variables are set, false otherwise
  return !!generateKey;
}

// Function to call the Azure AI Vision service Image Analysis 4.0 API
async function analyzeImage(imageUrl) {
  try {
    // Make a POST request to the API endpoint
    const response = await axios.post(
      "https://githubcourse.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=caption",
      {
        url: imageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY,
        },
      }
    );

    // Return the JSON response
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error("Error analyzing image:", error);
    throw error;
  }
}

export { isConfiguredAnalysis, analyzeImage };
