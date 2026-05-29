import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "school-erp/students",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      )
      .end(buffer);
  });
};

export default uploadToCloudinary;
