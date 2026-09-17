const mongoose = require('mongoose');
const Resource = require('../models/Resource');

const validateResource = (data) => {
  const { title, subject, category, resourceLink } = data;

  if (!title || !title.trim()) {
    return 'Title is required.';
  }

  if (!subject || !subject.trim()) {
    return 'Subject is required.';
  }

  if (!category || !category.trim()) {
    return 'Category is required.';
  }

  if (resourceLink && resourceLink.trim()) {
    try {
      const url = new URL(resourceLink.trim());
      if (!['http:', 'https:'].includes(url.protocol)) {
        return 'Resource link must be a valid HTTP or HTTPS URL.';
      }
    } catch {
      return 'Resource link must be a valid HTTP or HTTPS URL.';
    }
  }

  return null;
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('user', 'name email');
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching resources.', error: error.message });
  }
};

const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid resource ID.' });
    }

    const resource = await Resource.findOne({ _id: id, user: req.user._id }).populate('user', 'name email');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    return res.status(200).json(resource);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching resource.', error: error.message });
  }
};

const createResource = async (req, res) => {
  try {
    const { title, subject, category, description, resourceLink } = req.body;
    const validationError = validateResource({ title, subject, category, resourceLink });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const resource = await Resource.create({
      title: title.trim(),
      subject: subject.trim(),
      category: category.trim(),
      description: description ? description.trim() : '',
      resourceLink: resourceLink ? resourceLink.trim() : '',
      user: req.user._id,
    });

    return res.status(201).json({
      message: 'Resource created successfully.',
      resource,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating resource.', error: error.message });
  }
};

const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subject, category, description, resourceLink } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid resource ID.' });
    }

    const resource = await Resource.findOne({ _id: id, user: req.user._id });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    const validationError = validateResource({ title, subject, category, resourceLink });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        subject: subject.trim(),
        category: category.trim(),
        description: description ? description.trim() : '',
        resourceLink: resourceLink ? resourceLink.trim() : '',
      },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    return res.status(200).json({
      message: 'Resource updated successfully.',
      resource: updatedResource,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating resource.', error: error.message });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid resource ID.' });
    }

    const resource = await Resource.findOne({ _id: id, user: req.user._id });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    await resource.deleteOne();

    return res.status(200).json({
      message: 'Resource deleted successfully.',
      resource,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting resource.', error: error.message });
  }
};

module.exports = {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
