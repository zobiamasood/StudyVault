const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
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
    category: 'Past Papers',
    description:
      'Past exam paper including algorithmic questions, complexity analysis, and problem-solving tasks for revision.',
    resourceLink: 'https://www.geeksforgeeks.org/data-structures/',
  },
  {
    title: 'Web Development Assignment',
    subject: 'Web Development',
    category: 'Assignments',
    description:
      'A practical assignment requiring students to build a responsive web page using HTML, CSS, and JavaScript.',
    resourceLink: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax',
  },
  {
    title: 'Operating Systems Book',
    subject: 'Operating Systems',
    category: 'Books',
    description:
      'A foundational textbook covering process scheduling, memory management, deadlocks, and file systems.',
    resourceLink: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
  },
  {
    title: 'React.js Complete Tutorial',
    subject: 'Web Development',
    category: 'Videos',
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
        password: await bcrypt.hash('studyvault123', 10),
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
        await Resource.create({ ...resource, user: demoUser._id });
        insertedCount += 1;
        console.log(`Inserted: ${resource.title}`);
      } else {
        await Resource.updateOne(
          { _id: existingResource._id },
          { $set: { ...resource, user: demoUser._id } }
        );
        console.log(`Updated: ${resource.title}`);
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
