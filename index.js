const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

const photosDirectory = path.resolve(__dirname, "photos");
app.use("/photos", express.static(photosDirectory));

// Enable CORS - Allow all origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "photos"); // Files will be saved in the 'photos' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Set up multer upload
const upload = multer({ storage });

// Route to handle file upload
app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Construct the URL to the uploaded image
  const imageUrl = `${req.protocol}://${req.get("host")}/photos/${
    req.file.filename
  }`;

  console.log("Uploaded Image URL:", imageUrl); // Log the URL for debugging

  // Send back HTML response with a link to the uploaded image
  res.send(
    `<h1>File uploaded successfully!</h1><a href="${imageUrl}" target="_blank">View Uploaded Image</a>`
  );
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

// Start the server
const PORT = 6900;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
