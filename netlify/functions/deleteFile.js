// functions/deleteFile.js

const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { public_id } = JSON.parse(event.body);
  const cloudinaryApiUrl = `https://api.cloudinary.com/v1_1/dnqzqicca/destroy`;
  const cloudinaryApiKey = 'your_api_key'; // Replace with your actual Cloudinary API key
  const cloudinaryApiSecret = 'your_api_secret'; // Replace with your actual Cloudinary API secret

  const formData = new URLSearchParams();
  formData.append('public_id', public_id);
  formData.append('api_key', cloudinaryApiKey);
  formData.append('api_secret', cloudinaryApiSecret);

  try {
    const response = await fetch(cloudinaryApiUrl, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.result === 'ok') {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: result }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
