const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = async (event) => {
  try {
    // Parse the public_id from the event body (this should be passed from your front-end)
    const { public_id } = JSON.parse(event.body);

    // Log the public_id for debugging purposes
    console.log("Received public_id:", public_id);

    // Use the destroy method to delete the asset from Cloudinary, and invalidate the cached version from the CDN
    const result = await cloudinary.uploader.destroy(public_id, { invalidate: true });

    // Log the result from Cloudinary for debugging
    console.log("Cloudinary result:", result);

    // Check if the result is 'ok', indicating that the deletion was successful
    if (result.result !== 'ok') {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to delete file from Cloudinary', result })
      };
    }

    // Return a success response if the file was deleted successfully
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File deleted successfully', result })
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Delete error:", error);
    
    // Return a 500 status code with the error message
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message })

exports.handler = async (event) => {...}
  try {
    console.log("DELETE FUNCTION TRIGGERED");
    console.log("ENV:", process.env.CLOUDINARY_CLOUD_NAME);
    const { public_id } = JSON.parse(event.body);
    console.log("public_id received:", public_id);
    
    const result = await cloudinary.uploader.destroy(public_id, { invalidate: true });
    console.log("Cloudinary result:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File deleted successfully', result })
    };
  } catch (error) {
    console.error("Error in deleteFile function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message })
    };
  }
};
