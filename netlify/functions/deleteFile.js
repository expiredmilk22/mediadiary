const cloudinary = require('cloudinary').v2;

exports.handler = async (event) => {
  console.log("Incoming event:", event);

  try {
    console.log("Configuring Cloudinary...");
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    console.log("Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "NOT SET"
    });

    const { public_id } = JSON.parse(event.body);
    console.log("Public ID received:", public_id);

    const result = await cloudinary.uploader.destroy(public_id);
    console.log("Cloudinary delete result:", result);

    if (
