const express = require('express');
const router = express.Router();

const dataController = require('./dataController');
const viewController = require('./viewController');
const authController = require('../../controllers/auth/dataController');
const path = require('path');
const multer = require('multer');


// ----------------------
// 🌐 View Routes
// ----------------------
/*


### projects
- create a project * loggedin
        - verify the user
        - take the project data
        - create a project
        - send them back to the project index
*/

// 🔧 Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Save in this folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});
const upload = multer({ storage });


router.post('/', authController.auth, upload.fields([
    { name: 'beforeImage', maxCount: 1 },
    { name: 'afterImage', maxCount: 1 }
  ]),dataController.createProject, viewController.redirectToCreatedProjects)// this redirects to createdProjects
router.get('/new', authController.auth, viewController.new) // show the form that has the create action

/*
- edit a project * loggedin * authorized
        - show a form to edit project
        - fill out and process form
        - redirect back to project
*/
router.put('/:id', authController.auth, dataController.editProject, viewController.redirectToShowPage
)
router.get('/:id/edit', authController.auth, dataController.seeIndividualProject, viewController.edit
)

/*
- delete a project * logged in * authorized
        - show a form to delete a project
        - process the delete
        - redirect them to a project index
*/
router.delete('/:id', authController.auth, dataController.deleteProject, viewController.redirectToCreatedProjects)
/*
- read all projects * logged in
        - index of all projects
*/
router.get('/', authController.auth, dataController.index, viewController.index)

/*
- see individual project * logged in
        - display an individual project
*/

router.get('/:id', authController.auth, dataController.seeIndividualProject, viewController.show)
/*
- see projects a user created 
        - index filtered by createdBY
*/

router.get('/index/created', authController.auth, dataController.seeUserCreatedProjects, viewController.indexWithDeleteButtons)

/*
- see projects a user is volunteered on *
        - index filtered by being included in the volunteers
*/

router.get('/index/volunteered', authController.auth, dataController.volunteeredProjects, viewController.volunteered)

/*
### comments
### compound functions
- volunteer a user for a project * loggedin
   - identify a user
   - identify a project
   - add the user to the list of volunteers
*/

router.post('/:id/volunteer', authController.auth, dataController.signupForProject, viewController.redirectToVolunteeredProjects)

/*
- comment on a project * logged in
    - create a comment
    - identify a project
    - add the comment to a project
*/

router.post('/:id/comments', authController.auth, dataController.addComment, viewController.redirectToShowPage)


module.exports = router