const mongoose = require('mongoose');
const Resource = require('./models/Resource');
const User = require('./models/User');

const knownDummyTitles = [
  'Test Resource',
  'Test Resource from Auth',
  'API verification resource',
  'Operating Systems Book',
  'Web Development Assignment',
  'Data Structures & Algorithms Past Paper',
];

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/StudyVault');
    console.log('Connected to MongoDB\n');
    
    const result = await Resource.deleteMany({ title: { $in: knownDummyTitles } });
    const qaUsers = await User.deleteMany({ email: /^qa\..*@studyvault\.test$/i });
    
    console.log(`=== CLEANUP COMPLETE ===`);
    console.log(`Deleted ${result.deletedCount} known dummy resource(s)`);
    console.log(`Deleted ${qaUsers.deletedCount} disposable QA user(s)`);
    
    // Show remaining resources
    const remaining = await Resource.find({}).select('title category');
    console.log(`\n=== REMAINING RESOURCES (${remaining.length}) ===`);
    remaining.forEach((r, i) => {
      console.log(`${i+1}. ${r.title} [${r.category}]`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
