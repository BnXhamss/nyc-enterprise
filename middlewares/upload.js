import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Cloudinary storage for general uploads
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nyc-enterprise", // Folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
  },
});

// Create Cloudinary storage for product images
const productImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nyc-enterprise/product-images", // Folder for product images
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Create Cloudinary storage for product pictures
const productPicturesStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nyc-enterprise/product-pictures", // Folder for product pictures
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Multer upload configurations
export const localUpload = multer({ dest: "uploads" }); // Local upload (optional)

export const remoteUpload = multer({ storage: cloudinaryStorage }); // General remote upload

export const productImageUpload = multer({ storage: productImageStorage }); // Product image upload

export const productPicturesUpload = multer({ storage: productPicturesStorage }); // Product pictures upload