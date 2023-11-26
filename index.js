const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

// Serve static files from the 'photos' directory
app.use("/photos", express.static(path.join(__dirname, "photos")));

// Enable CORS for specific origin
app.use(
  cors({
    origin: "https://photos-api-mzpl.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // if you're using cookies or authentication headers
  })
);

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
  res.send("File uploaded successfully.");
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});

// Start the server
const PORT = 6800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
