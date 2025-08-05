const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  issueType: String,
  equipment: String,
  beforeImage: String,
  afterImage: String,
  status: { type: String, default: 'pending', enum: ['pending', 'complete'] },
  dateStarted: String,
  dateCompleted: String,
  volunteerLimit: Number,
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

module.exports = mongoose.model('Project', projectSchema)
