const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync('./data/questions.json');
    const questions = JSON.parse(data);
    res.json(questions);
  } catch (err) {
    console.error('Erreur lors de la lecture des questions :', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
