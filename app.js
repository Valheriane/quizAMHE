const express = require('express');
const fs = require('fs');
const path = require('path');
const quizRouter = require('./routes/quiz');

const app = express();
const PORT = process.env.PORT || 3038;

// D'abord les middlewares
app.use(express.json());
app.use(express.static('public')); // ← Doit venir AVANT les routes

// Puis les routes
app.use('/quiz', quizRouter);

app.get('/questions', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'questions.json');
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
