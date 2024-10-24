
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryInstance } from './cloudinary.js';
import multer from 'multer';




const storage = new CloudinaryStorage({
  cloudinary: cloudinaryInstance,
  params: {
    folder: 'products', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

export default upload;
