import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const FOLDER = "gloaro-portfolio";

export async function uploadMedia(fileOrBuffer, { folder = FOLDER, resourceType = "auto" } = {}) {
  return cloudinary.uploader.upload(fileOrBuffer, {
    folder,
    resource_type: resourceType,
  });
}

export async function deleteMedia(publicId, { resourceType = "image" } = {}) {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export function getOptimizedUrl(publicId, { width, height, crop = "fill" } = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    quality: "auto",
    fetch_format: "auto",
    width,
    height,
    crop: width || height ? crop : undefined,
  });
}

export default cloudinary;
