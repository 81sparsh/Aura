import {v2 as cloudinary} from 'cloudinary';
/*
mport {v1 as cloudinary} from 'cloudinary';  
- Imports the v1 API from the cloudinary package 
and renames it to cloudinary for use in your code.
*/

import dotenv from 'dotenv';

dotenv.config();

//this will config the cloudinary with the credentials from the .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
