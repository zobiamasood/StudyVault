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

router.route('/').get(getResources).post(protect, createResource);
router.route('/:id').get(getResourceById).put(protect, updateResource).delete(protect, deleteResource);

module.exports = router;
