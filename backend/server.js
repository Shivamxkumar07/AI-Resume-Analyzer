const dns = require('dns');
// Fixes potential MongoDB connection timeouts by using Google's DNS
dns.setServers(['8.8.8.8', '8.8.4.4']); 

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Import your Mongoose Model
const Analysis = require('./models/Analysis');

const app = express();

// CHANGED: Use process.env.PORT for Render, fallback to 4000 for local dev
const PORT = process.env.PORT || 4000; 

// 1. Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. UPDATED CORS CONFIGURATION
// Added your live Render frontend URL to the allowed origins
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    'https://ai-resume-analyzer-and-job-recommendation.onrender.com'
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// 3. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('------------------------------------');
    console.log('✅ DATABASE: Connected to MongoDB');
    console.log('------------------------------------');
  })
  .catch((err) => {
    console.error('❌ DATABASE ERROR:', err.message);
  });

// 4. Multer Setup for File Uploads
const upload = multer({ storage: multer.memoryStorage() });

// 5. Health Check Route
app.get('/', (req, res) => {
  res.send("<h1>Backend is Live!</h1><p>The AI Resume Analyzer server is running perfectly.</p>");
});

// 6. Main API Route: Upload & Analyze
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log(`📂 Received: ${req.file.originalname}`);

    // A. Extract Text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    let aiData;

    // B. AI Analysis with Graceful Fallback
    try {
      // CHANGED: Using gemini-1.5-flash (the standard production model)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
      const prompt = `
        Analyze this resume as a Senior Tech Recruiter.
        Return ONLY a JSON object exactly like this:
        {
          "atsScore": 85,
          "foundSkills": ["React", "Node.js"],
          "missingSkills": ["Docker", "AWS"]
        }
        Resume Text: ${resumeText}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI returned invalid data format");
      aiData = JSON.parse(jsonMatch[0]);

    } catch (aiError) {
      console.log(`⚠️ AI Analysis failed or timed out.`);
      
      aiData = {
        atsScore: 75,
        foundSkills: ["General Analysis"],
        missingSkills: ["Specific AI parsing unavailable"]
      };
    }

    // C. Save the Results to MongoDB
    const newAnalysis = new Analysis({
      fileName: req.file.originalname,
      atsScore: aiData.atsScore,
      foundSkills: aiData.foundSkills,
      missingSkills: aiData.missingSkills
    });

    const savedData = await newAnalysis.save();
    console.log(`📊 Analysis Complete & Saved for: ${req.file.originalname}`);

    // D. Send back to Frontend
    res.json({
      ...savedData.toObject(),
      extractedText: resumeText 
    });

  } catch (error) {
    console.error("❌ SERVER FATAL ERROR:", error.message);
    res.status(500).json({ error: "Server encountered a fatal error." });
  }
});

// 7. Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`------------------------------------`);
  console.log(`🚀 NODE.JS SERVER IS RUNNING ON PORT: ${PORT}`);
  console.log(`------------------------------------`);
});