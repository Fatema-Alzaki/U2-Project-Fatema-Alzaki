const Engineer = require('../../models/engineer');
const Project = require('../../models/Project');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Auth middleware (JWT verification)
exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('No token');
    const data = jwt.verify(token, 'secret');
    const engineer = await Engineer.findById(data._id);
    if (!engineer) throw new Error('Engineer not found');
    req.engineer = engineer;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Get engineer profile
exports.getProfile = async (req, res) => {
  res.json(req.engineer);
};

// Update engineer
exports.updateEngineer = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    updates.forEach(field => {
      req.engineer[field] = req.body[field];
    });
    await req.engineer.save();
    res.json(req.engineer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete engineer
exports.deleteEngineer = async (req, res) => {
  try {
    await req.engineer.deleteOne();
    res.json({ message: 'Engineer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all engineers (optional, for admin dashboard)
exports.getAll = async (req, res) => {
  try {
    const engineers = await Engineer.find().populate('projects');
    res.json(engineers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const engineer = req.engineer;
    const projects = await Project.find({ engineers: engineer._id });

    const completed = projects.filter(p => p.status === 'completed');
    const pollutionMitigated = completed.reduce((acc, p) => acc + (p.pollution || 0), 0);
    const timeSaved = completed.reduce((acc, p) => acc + (p.timeSaved || 0), 0);

    res.json({ 
      completedCount: completed.length, 
      pollutionMitigated, 
      timeSaved 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
