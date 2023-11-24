const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({    //passing configuration details backend ko cloudinary ky saath jorna
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

//Defining Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats : ["png", "jpeg", "jpg"]
    //   format: async (req, file) => 'png', // supports promises as well
    //   public_id: (req, file) => 'computed-filename-using-request',
    },
  });

module.exports = {
    cloudinary,
    storage
};