const express = require('express');
const {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getResources).post(createResource);
router.route('/:id').get(getResourceById).put(updateResource).delete(deleteResource);

module.exports = router;
