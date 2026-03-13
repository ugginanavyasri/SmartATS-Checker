const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {

    const fs = require("fs");
    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text.toLowerCase();
    const jobDescription = req.body.jobDescription.toLowerCase();

    const jobWords = jobDescription.split(/\W+/);
    let matchCount = 0;

    jobWords.forEach(word => {
      if (resumeText.includes(word)) {
        matchCount++;
      }
    });

    const score = Math.min(
      Math.round((matchCount / jobWords.length) * 100),
      100
    );

    res.json({ score });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error analyzing resume");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});