require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SERVE FRONTEND FILES
app.use(express.static(path.join(__dirname)));

// ✅ HOMEPAGE ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 10000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const voices = {
  "te-IN": "te-IN-Standard-A",
  "hi-IN": "hi-IN-Standard-A",
  "ta-IN": "ta-IN-Standard-A",
  "en-IN": "en-IN-Standard-A",
  "kn-IN": "kn-IN-Standard-A",
  "ml-IN": "ml-IN-Standard-A",
  "bn-IN": "bn-IN-Standard-A",
  "mr-IN": "mr-IN-Standard-A"
};

app.post('/speak', async (req, res) => {
  try {
    const { text, lang } = req.body;

    if (!text || !lang) {
      return res.status(400).json({ error: "Missing text or lang" });
    }

    if (!GOOGLE_API_KEY) {
      return res.status(500).json({ error: "Google API Key not configured" });
    }

    const voiceName = voices[lang] || voices["en-IN"];

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: lang, name: voiceName },
          audioConfig: { audioEncoding: 'MP3' }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.json({ audioContent: data.audioContent });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});