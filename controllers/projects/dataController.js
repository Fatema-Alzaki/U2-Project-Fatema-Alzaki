async function signupForProject(req, res) {
  try {
    const project = await Project.findById(req.params.id)

    if (project.volunteers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already signed up' })
    }

    if (project.volunteers.length >= project.volunteerLimit) {
      return res.status(400).json({ message: 'Project is full' })
    }

    project.volunteers.push(req.user._id)
    await project.save()

    res.json({ message: 'Signed up successfully', project })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
async function addComment(req, res) {
  try {
    const project = await Project.findById(req.params.id)
    project.comments.push({ user: req.user._id, text: req.body.text })
    await project.save()
    res.redirect(`/projects/${req.params.id}`)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
