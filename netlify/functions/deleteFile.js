const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { publicId } = JSON.parse(event.body);

    const CLOUD_NAME = "dnqzqicca"; // Your Cloudinary cloud name (this is public)
    const API_KEY = process.env.CLOUDINARY_API_KEY; // Pulled from Netlify environment variables
    const API_SECRET = process.env.CLOUDINARY_API_SECRET; // Pulled from Netlify environment variables

    const timestamp = Math.floor(Date.now() / 1000);

    // Cloudinary signature creation
    const crypto = require('crypto');
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

    const formData = new URLSearchParams();
    formData.append('public_id', publicId);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    const data = await response.json();

    if (data.result !== 'ok') {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to delete file from Cloudinary', data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File deleted successfully', data })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.message })
    };
  }
};
