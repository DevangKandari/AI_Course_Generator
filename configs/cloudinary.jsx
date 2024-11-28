import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Set in .env file
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, // Set in .env file
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET, // Set in .env file
});

export default cloudinary;
