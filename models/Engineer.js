const mongoose = require('mongoose')
const { Schema } = mongoose

const engineerSchema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true }, // e.g., Marine, Solar, Cleanup
  region: String,
  availability: { type: Boolean, default: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Engineer', engineerSchema)
