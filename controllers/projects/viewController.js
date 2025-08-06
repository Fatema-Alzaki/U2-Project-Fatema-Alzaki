const RESOURCE_PATH = '/projects';

const viewController = {
  // View: all projects
  index(req, res, next) {
    res.render('projects/Index', res.locals.data);
  },

  volunteered(req, res, next) {
    res.render('projects/Volunteered', res.locals.data);
  },

  // View: form to create a new project
  new(req, res, next) {
    res.render('projects/New', res.locals.data);
  },

  // View: form to edit a project
  edit(req, res, next) {
    res.render('projects/Edit', res.locals.data);
  },

  // View: single project
  show(req, res, next) {
    res.render('projects/Show', res.locals.data);
  },

  // Redirect: after editing or commenting (redirects to /projects/:id)
  redirectToShowPage(req, res, next) {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}?token=${res.locals.data.token}`);
    } else {
      res.redirect(`${RESOURCE_PATH}/${req.params.id}`);
    }
  },

  // Redirect: after creating or deleting (redirects to /projects/index/created)
  redirectToCreatedProjects(req, res, next) {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/index/created?token=${res.locals.data.token}`);
    } else {
      res.redirect(`${RESOURCE_PATH}/index/created`);
    }
  },

  // View: user's created projects with delete buttons
  indexWithDeleteButtons(req, res, next) {
    res.render('projects/MyProjects', res.locals.data);
  },

  // Redirect: after volunteering (redirects to /projects/index/volunteered)
  redirectToVolunteeredProjects(req, res, next) {
    if (res.locals.data.token) {
      res.redirect(`${RESOURCE_PATH}/index/volunteered?token=${res.locals.data.token}`);
    } else {
      res.redirect(`${RESOURCE_PATH}/index/volunteered`);
    }
  }
};

module.exports = viewController;
