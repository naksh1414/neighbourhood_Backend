import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./ClodinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "localities", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed image formats
  },
});

const upload = multer({ storage });

export default upload;
