const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['engineer', 'admin'], default: 'engineer' },
  engineers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Engineer' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, { timestamps: true })

// Hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Auth methods
userSchema.methods.comparePassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password)
}

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

module.exports = mongoose.model('User', userSchema)
