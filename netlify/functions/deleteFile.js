const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const { public_id } = JSON.parse(event.body);

  const CLOUD_NAME = "dnqzqicca";
  const API_KEY = "713675787775187";
  const API_SECRET = "H_o14NtBW6SIVaC67Yvf8PRb0Co";

  const timestamp = Math.floor(Date.now() / 1000);
  const signatureString = `public_id=${public_id}&timestamp=${timestamp}${API_SECRET}`;

  const crypto = require("crypto");
  const signature = crypto
    .createHash("sha1")
    .update(signatureString)
    .digest("hex");

  const formData = new URLSearchParams();
  formData.append("public_id", public_id);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData
      }
    );
    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to delete file", details: error })
    };
  }
};
