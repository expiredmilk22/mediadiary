import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handler(event) {
  try {
    // Parse the incoming request body
    const { publicId } = JSON.parse(event.body);

    // Perform the deletion
    const result = await cloudinary.uploader.destroy(publicId);

    // Handle Cloudinary's response
    if (result.result === 'ok') {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'File deleted successfully.' }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete file.' }),
      };
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error.' }),
    };
  }
}
