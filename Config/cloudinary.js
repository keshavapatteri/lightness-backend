import dotenv from 'dotenv';
dotenv.config(); 

// console.log('CLOUD_NAME:', process.env.CLOUD_NAME);
// console.log('CLOUD_API_KEY:', process.env.CLOUD_API_KEY);
// console.log('CLOUD_API_SECRET:', process.env.CLOUD_API_SECRET);

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export const cloudinaryInstance = cloudinary;
