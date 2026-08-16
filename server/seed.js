const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resource = require('./models/Resource');
const User = require('./models/User');

dotenv.config();

const demoResources = [
  {
    title: 'JavaScript Fundamentals',
    subject: 'Web Development',
    category: 'Notes',
    description:
      'A clear beginner-friendly guide covering JavaScript variables, functions, loops, arrays, conditionals, and DOM basics.',
    resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    title: 'Database Management Systems',
    subject: 'Database',
    category: 'Notes',
    description:
      'Concise notes on relational databases, SQL, normalization, ER diagrams, and transaction management concepts.',
    resourceLink: 'https://www.geeksforgeeks.org/dbms/',
  },
  {
    title: 'Data Structures & Algorithms Past Paper',
    subject: 'Computer Science',
    category: 'Past Paper',
    description:
      'Past exam paper including algorithmic questions, complexity analysis, and problem-solving tasks for revision.',
    resourceLink: 'https://example.com/dsa-past-paper',
  },
  {
    title: 'Web Development Assignment',
    subject: 'Web Development',
    category: 'Assignment',
    description:
      'A practical assignment requiring students to build a responsive web page using HTML, CSS, and JavaScript.',
    resourceLink: 'https://example.com/web-dev-assignment',
  },
  {
    title: 'Operating Systems Book',
    subject: 'Operating Systems',
    category: 'Book',
    description:
      'A foundational textbook covering process scheduling, memory management, deadlocks, and file systems.',
    resourceLink: 'https://example.com/operating-systems-book',
  },
  {
    title: 'React.js Complete Tutorial',
    subject: 'Web Development',
    category: 'Video',
    description:
      'A full tutorial walking through components, props, state, hooks, routing, and building modern React applications.',
    resourceLink: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/StudyVault';

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    let demoUser = await User.findOne({ email: 'demo@studyvault.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Demo User',
        email: 'demo@studyvault.com',
        password: 'studyvault123',
      });
      console.log('Created demo user.');
    }

    let insertedCount = 0;

    for (const resource of demoResources) {
      const existingResource = await Resource.findOne({
        title: resource.title,
        subject: resource.subject,
      });

      if (!existingResource) {
        await Resource.create({ ...resource, createdBy: demoUser._id });
        insertedCount += 1;
        console.log(`Inserted: ${resource.title}`);
      } else {
        console.log(`Skipped duplicate: ${resource.title}`);
      }
    }

    console.log(`Demo data check complete. Inserted ${insertedCount} new resources.`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDatabase();
