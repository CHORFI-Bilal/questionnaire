// server/index.js
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Connexion à SQLite en mode WAL
let db;
(async () => {
  db = await open({
    filename: path.join(__dirname, 'survey.db'),
    driver: sqlite3.Database
  });
  await db.exec('PRAGMA journal_mode = WAL;');

  // Création des tables si elles n'existent pas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS demographic_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gender TEXT,
      age TEXT,
      education TEXT,
      experience TEXT,
      position TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS survey_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      demographic_id INTEGER,
      question_id TEXT,
      answer INTEGER,
      FOREIGN KEY(demographic_id) REFERENCES demographic_data(id)
    )
  `);
})();

// Route POST unique pour stocker tout
app.post('/api/survey', async (req, res) => {
  try {
    const { demographic, responses } = req.body;

    if (!demographic || !responses) {
      return res.status(400).json({ success: false, message: 'Missing data' });
    }

    await db.exec('BEGIN TRANSACTION');

    // Insertion des données démographiques
    const result = await db.run(
      `INSERT INTO demographic_data (gender, age, education, experience, position)
       VALUES (?, ?, ?, ?, ?)`,
      [demographic.gender, demographic.age, demographic.education, demographic.experience, demographic.position]
    );

    const demographicId = result.lastID;

    // Insertion des réponses au questionnaire
    for (const [questionId, answer] of Object.entries(responses)) {
      await db.run(
        `INSERT INTO survey_answers (demographic_id, question_id, answer)
         VALUES (?, ?, ?)`,
        [demographicId, questionId, answer]
      );
    }

    await db.exec('COMMIT');
    res.json({ success: true, message: 'Survey saved successfully' });

  } catch (error) {
    if (db) await db.exec('ROLLBACK');
    console.error('Error saving survey:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur API sur http://localhost:${PORT}`);
});
