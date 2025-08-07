const User = require('../../models/User')
const Project = require('../../models/Project')
const Comment = require('../../models/comment')

/**
 * - create a project * loggedin
        - verify the user
        - take the project data
        - create a project
        - send them back to the project index
- edit a project * loggedin * authorized
        - show a form to edit project
        - fill out and process form
        - redirect back to project
- delete a project * logged in * authorized
        - show a form to delete a project
        - process the delete
        - redirect them to a project index
- read all projects * logged in
        - index of all projects
- see individual project * logged in
        - display an individual project
- see projects a user created 
        - index filtered by createdBY
- see projects a user is volunteered on *
        - index filtered by being included in the volunteers

### compound functions
- volunteer a user for a project * loggedin
   - identify a user
   - identify a project
   - add the user to the list of volunteers
- comment on a project * logged in
    - create a comment
    - identify a project
    - add the comment to a project
 */

const dataController = {}

/*
 * - create a project * loggedin
       - verify the user
       - take the project data
       - create a project
       - send them back to the project index
*/

dataController.createProject = async (req, res, next) => {
  try {
    // Get uploaded file names if available
    const beforeImagePath = req.files?.beforeImage?.[0]?.filename || null;
    const afterImagePath = req.files?.afterImage?.[0]?.filename || null;
    // Create project with full data
    const project = new Project({
      ...req.body,
      createdBy: req.user._id,
      beforeImage: beforeImagePath,
      afterImage: afterImagePath
    });

    // Auto-volunteer the creator
    project.volunteers.addToSet(req.user);

    // Save and forward
    await project.save();
    res.locals.data.project = project;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/*
- edit a project * loggedin * authorized
    - show a form to edit project
    - fill out and process form
    - redirect back to project
*/

dataController.editProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy volunteers')
    console.log(req.body)
    console.log(project)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    if (req.user._id.toString() !== project.createdBy._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to edit this project' })
    }
    await project.updateOne(req.body)
    res.locals.data.project = project
    next()
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
- delete a project * logged in * authorized
    - show a form to delete a project (via view)
    - process the delete
    - redirect them to project index
*/

dataController.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    if (req.user._id.toString() !== project.createdBy.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this project' })
    }
    await project.deleteOne()
    next()
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


dataController.addComment = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
    const comment = new Comment({ ...req.body, user: req.user._id })
    await comment.save()
    project.comments.addToSet(comment)
    await project.save()
    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

dataController.show = async (req, res, next) => {
  try {
    res.locals.data.project = await Project.findById(req.params.id)
    if (!res.locals.data.project) {
      throw new error(`could not locate a project with the id ${req.params.id}`)
    }
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.index = async (req, res, next) => {
  try {
    res.locals.data.projects = await Project.find({})
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

dataController.signupForProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)

    if (project.volunteers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already signed up' })
    }

    if (project.volunteers.length >= project.volunteerLimit) {
      return res.status(400).json({ message: 'Project is full' })
    }

    project.volunteers.addToSet({ _id: req.user._id })
    await project.save()
    next()

    res.json({ message: 'Signed up successfully', project })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// - read all projects * logged in
//         - index of all projects
// - see individual project * logged in
//         - display an individual project
// - see projects a user created 
//         - index filtered by createdBY
// - see projects a user is volunteered on *
//         - index filtered by being included in the volunteers


dataController.seeIndividualProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy volunteers comments')

    if (!project) {
      return res.status(404).send({ message: 'Project not found' });
    }

    res.locals.data.project = project
    next()
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};


dataController.seeUserCreatedProjects = async (req, res, next) => {
  try {
    const userId = req.user._id;
    res.locals.data.projects = await Project.find({ createdBy: userId });
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};


dataController.volunteeredProjects = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const foundProjects = await Project.find({});
    // loop through this thing if we get an error
    const filteredProjects = foundProjects.filter((project) => project.volunteers.includes(userId))
    res.locals.data.projects = filteredProjects
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = dataController