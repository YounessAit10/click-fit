const express = require('express');
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Config de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/upload_images'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ Route upload image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier reçu' });
  }
  const filePath = '/upload_images/' + req.file.filename;
  res.json({ filePath });
});

// ✅ Route add-user
app.post('/add-user', async (req, res) => {
  const { email, password, type, active } = req.body;

  try {
    const [result] = await db.query(
      'CALL addUser(?, ?, ?, ?)',
      [email, password, type, active]
    );
    res.status(200).json({ message: 'Utilisateur ajouté avec succès.' });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
