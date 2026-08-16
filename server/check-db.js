const mongoose = require('mongoose');
const Resource = require('./models/Resource');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/StudyVault');
    console.log('Connected to MongoDB\n');
    
    // Find all resources
    const resources = await Resource.find({}).select('_id title subject category');
    console.log('=== ALL RESOURCES IN DATABASE ===');
    resources.forEach((r, i) => {
      console.log(`${i+1}. ${r.title}`);
    });
    
    // Find test resources
    const testResources = await Resource.find({
      title: { $in: ['Test Resource', 'Test Resource from Auth'] }
    });
    
    if (testResources.length > 0) {
      console.log('\n=== TEST RESOURCES FOUND ===');
      testResources.forEach(r => console.log(`- ${r.title} (ID: ${r._id})`));
    } else {
      console.log('\nNo test resources found in database');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
