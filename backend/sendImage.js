const tus = require("tus-js-client");
const fs = require("fs");

// Function to send the image file using Tus
const sendImageWithTus = (filePath, serverUrl) => {
  const fileStream = fs.createReadStream(filePath);
  const stats = fs.statSync(filePath);

  const startTime = Date.now();

  const upload = new tus.Upload(fileStream, {
    endpoint: serverUrl,
    metadata: {
      filename: filePath.split("/").pop(),
      filetype: "image/jpeg", // Adjust based on the actual file type
    },
    uploadSize: stats.size,
    onError: (error) => {
      console.error("Upload failed:", error.message);
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      console.log(`Uploaded ${percentage}%`);
    },
    onSuccess: () => {
      console.log("Upload finished successfully.");
      console.log(`Upload time: ${Date.now() - startTime}`);
    },
  });

  upload.start();
};

// Example usage
const filePath = "./large_image.jpg"; // Path to your image file
const serverUrl = "http://localhost:3000/images/upload-image"; // Tus server endpoint
sendImageWithTus(filePath, serverUrl);
