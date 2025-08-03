const Project = require('../../models/Project')

module.exports = {
  async index(req, res) {
    const projects = await Project.find({}).populate('user')
    res.render('projects/Index', { projects, user: req.user })
  },

  async show(req, res) {
    const project = await Project.findById(req.params.id)
      .populate('user')
      .populate('engineers')
      .populate('comments.user')

    res.render('projects/Show', { project, user: req.user })
  },

  new(req, res) {
    res.render('projects/New', { user: req.user })
  },

  async edit(req, res) {
    const project = await Project.findById(req.params.id)
    res.render('projects/Edit', { project, user: req.user })
  }
}
