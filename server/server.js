const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/StudyVault';
const allowedOrigin = 'https://study-vault-delta.vercel.app';

const migrateResourceOwners = async () => {
  await mongoose.connection.collection('resources').updateMany(
    { user: { $exists: false }, createdBy: { $exists: true } },
    [{ $set: { user: '$createdBy' } }, { $unset: 'createdBy' }]
  );
};

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'StudyVault API is running.' });
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await migrateResourceOwners();
    console.log('MongoDB connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

startServer();
