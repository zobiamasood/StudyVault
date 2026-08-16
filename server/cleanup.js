const mongoose = require('mongoose');
const Resource = require('./models/Resource');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/StudyVault');
    console.log('Connected to MongoDB\n');
    
    // Delete test resources
    const result = await Resource.deleteMany({
      title: { $in: ['Test Resource', 'Test Resource from Auth'] }
    });
    
    console.log(`=== CLEANUP COMPLETE ===`);
    console.log(`Deleted ${result.deletedCount} test resource(s)`);
    
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
