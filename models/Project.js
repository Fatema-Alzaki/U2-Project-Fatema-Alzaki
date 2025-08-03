const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now }
})

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  issueType: String,
  equipment: String,
  beforeImage: String,
  afterImage: String,
  status: { type: String, default: 'pending' },
  dateStarted: Date,
  dateCompleted: Date,
  volunteerLimit: Number,
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Engineer' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [commentSchema]
})

module.exports = mongoose.model('Project', projectSchema)
