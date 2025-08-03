const Project = require('../../models/Project')

module.exports = {
  async index(req, res) {
    const projects = await Project.find({}).populate('engineers user')
    res.json(projects)
  },

  async show(req, res) {
    const project = await Project.findById(req.params.id)
      .populate('engineers user comments.user')
    res.json(project)
  },

  async create(req, res) {
    const project = await Project.create({
      ...req.body,
      user: req.user._id,
      currentVolunteers: 0
    })
    res.status(201).json(project)
  },

  async update(req, res) {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(project)
  },

  async destroy(req, res) {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Project deleted' })
  },

  async volunteer(req, res) {
    const project = await Project.findById(req.params.id)

    if (!project) return res.status(404).json({ message: 'Not found' })
    if (project.engineers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already joined' })
    }

    if (project.engineers.length >= project.volunteerCapacity) {
      return res.status(400).json({ message: 'Volunteer slots full' })
    }

    project.engineers.push(req.user._id)
    project.currentVolunteers = project.engineers.length
    await project.save()

    res.json({ message: 'You have joined this project', project })
  },

  async addComment(req, res) {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })

    const comment = {
      text: req.body.text,
      user: req.user._id
    }

    project.comments.push(comment)
    await project.save()
    res.redirect(`/projects/${req.params.id}`)
  }
}
