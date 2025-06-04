const request = require('supertest');
const express = require('express');
const quizRouter = require('../routes/quiz');

const app = express();
app.use('/quiz', quizRouter);

describe('GET /quiz', () => {
  it('should return a list of questions with expected properties', async () => {
    const res = await request(app).get('/quiz');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const q = res.body[0];
    expect(q).toHaveProperty('question');
    expect(q).toHaveProperty('choices');
    expect(q).toHaveProperty('answer');
    expect(Array.isArray(q.choices)).toBe(true);
  });
});

const fs = require('fs');

describe('GET /quiz with no data', () => {
  it('should return an empty array if the file is empty', async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([]));

    const res = await request(app).get('/quiz');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);

    fs.readFileSync.mockRestore(); // Rétablit le comportement d’origine
  });
});

describe('GET /quiz with malformed JSON', () => {
  it('should return 500 if JSON file is invalid', async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue("not-a-json");

    const res = await request(app).get('/quiz');
    expect(res.statusCode).toBe(500);

    fs.readFileSync.mockRestore();
  });
});
describe('GET /quiz with missing file', () => {
  it('should return 500 if the file does not exist', async () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('File not found');
    });

    const res = await request(app).get('/quiz');
    expect(res.statusCode).toBe(500);

    fs.readFileSync.mockRestore();
  });
});