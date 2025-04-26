const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { public_id } = JSON.parse(event.body);

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== 'ok') {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to delete file from Cloudinary', result })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File deleted successfully', result })
    };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message })
    };
  }
};
