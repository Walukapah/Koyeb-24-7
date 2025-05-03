const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const { exec } = require('child_process');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });
const YT_STREAM = process.env.YOUTUBE_STREAM_URL;

// Stream uploaded video file
app.post('/stream-file', upload.single('video'), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const cmd = `ffmpeg -re -i "${filePath}" -c:v libx264 -preset veryfast -b:v 3000k -c:a aac -b:a 160k -f flv "${YT_STREAM}"`;

  exec(cmd, (err) => {
    if (err) return res.status(500).send('Video streaming failed');
    res.send('Video streaming started');
  });
});

// Stream video from URL
app.post('/stream-url', (req, res) => {
  const url = req.body.videoUrl;
  const cmd = `ffmpeg -re -i "${url}" -c:v libx264 -preset veryfast -b:v 3000k -c:a aac -b:a 160k -f flv "${YT_STREAM}"`;

  exec(cmd, (err) => {
    if (err) return res.status(500).send('Video URL streaming failed');
    res.send('Video URL streaming started');
  });
});

// Stream uploaded audio file
app.post('/stream-audio-file', upload.single('audio'), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const cmd = `ffmpeg -re -i "${filePath}" -f lavfi -i color=c=black:s=1280x720 -shortest -c:v libx264 -preset veryfast -c:a aac -b:a 128k -f flv "${YT_STREAM}"`;

  exec(cmd, (err) => {
    if (err) return res.status(500).send('Audio streaming failed');
    res.send('Audio streaming started');
  });
});

// Stream audio from URL
app.post('/stream-audio-url', (req, res) => {
  const url = req.body.audioUrl;
  const cmd = `ffmpeg -re -i "${url}" -f lavfi -i color=c=black:s=1280x720 -shortest -c:v libx264 -preset veryfast -c:a aac -b:a 128k -f flv "${YT_STREAM}"`;

  exec(cmd, (err) => {
    if (err) return res.status(500).send('Audio URL streaming failed');
    res.send('Audio URL streaming started');
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
