// netlify/functions/deleteFile.js
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const { public_id } = JSON.parse(event.body);
  const cloudName = "dnqzqicca";  // Your Cloudinary cloud name
  const apiKey = "your_api_key";  // Your Cloudinary API Key
  const apiSecret = "your_api_secret";  // Your Cloudinary API Secret

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/destroy`;

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ public_id })
  });

  const data = await response.json();

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: data })
    };
  }
};
