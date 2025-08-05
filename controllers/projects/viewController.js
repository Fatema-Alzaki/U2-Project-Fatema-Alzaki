const Project = require('../../models/Project')

module.exports = {
  // Show all projects
  async index(req, res) {
    const projects = await Project.find({}).populate('user')
    res.render('projects/Index', { projects, user: req.user })
  },

  // Show one project
  async show(req, res) {
    const project = await Project.findById(req.params.id)
      .populate('user')
      .populate('engineers')
      .populate('comments.user')

    res.render('projects/Show', { project, user: req.user })
  },

  // Show project creation form
  new(req, res) {
    res.render('projects/New', { user: req.user })
  },

  // Show edit form for a project
  async edit(req, res) {
    const project = await Project.findById(req.params.id)
    res.render('projects/Edit', { project, user: req.user })
  },

  // Show projects this user volunteered for
  async volunteered(req, res) {
    const userId = req.user._id
    const projects = await Project.find({ volunteers: userId })
    res.render('projects/Volunteered', { projects, user: req.user })
  },

  // Show projects created by this user
  async myProjects(req, res) {
    const userId = req.user._id
    const projects = await Project.find({ owner: userId })
    res.render('projects/MyProjects', { projects, user: req.user })
  }
}