const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // Import the cors package

const app = express();

// Serve static files from the 'photos' directory
app.use("/photos", express.static(path.join(__dirname, "photos")));
// Use cors middleware to enable CORS for all routes
app.use(cors());

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

app.get("/", (req, res) => {
  res.send("Hello, this is your server!"); // Or any other response you want for the root URL
});

// Start the server
const PORT = 6700;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
