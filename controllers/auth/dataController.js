const { useSyncExternalStore } = require('react');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
/*
### users
 
- signup
        fill out a form
        create a user in the db
        redirect the LOGIN
- login
        fill out a form
        verify password credntials
        redirect to projects home
- auth
        verify token
        set user & token in data
        pass data to the next function
*/

const dataController = {}

/*
- auth
        verify token
        set user & token in data
        pass data to the next function
*/

dataController.auth = async (req, res, next) => {
  try {
    let token
    if (req.query.token) {
      token = req.query.token
    } else if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '')
    } else {
      throw new Error('No token provided')
    }
    const data = jwt.verify(token, 'secret')
    const user = await User.findOne({ _id: data._id })
    if (!user) {
      throw new Error()
    }
    req.user = user
    res.locals.data.token = token
    next()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

// - signup
//         fill out a form
//         create a user in the db
//         redirect the LOGIN

dataController.signUp = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save()
    req.user =user
    res.locals.data.token = await user.generateToken()
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// - login
//         fill out a form
//         verify password credntials
//         redirect to projects home

dataController.loginUser = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error('User not found');

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error('Invalid credentials');

      res.locals.data = user;
      res.locals.data.token = await user.generateToken();
      next();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

// - profile 
//       - show page user
dataController.profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.locals.data.foundUser = user 
    next()
  } catch (error) {
     res.status(401).json({ error: error.message });
  }
}

module.exports = dataController
// module.exports = {
//   // Create a new user
//   async createUser(req, res, next) {
//     try {
//       const user = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//       });
//       res.locals.data = user;
//       next();
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   },

//   // Log in an existing user
//   async loginUser(req, res, next) {
//     try {
//       const user = await User.findOne({ email: req.body.email });
//       if (!user) throw new Error('User not found');

//       const match = await bcrypt.compare(req.body.password, user.password);
//       if (!match) throw new Error('Invalid credentials');

//       res.locals.data = user;
//       res.locals.data.token = await user.generateToken();
//       next();
//     } catch (err) {
//       res.status(401).json({ error: err.message });
//     }
//   },

//   // Get all users
//   async index(req, res, next) {
//     try {
//       const users = await User.find();
//       res.locals.data = { users };
//       return typeof next === 'function' ? next() : res.json(users);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//     }
//   },

//   // Get a single user
//   async show(req, res, next) {
//     try {
//       const user = await User.findById(req.params.id);
//       res.locals.data = { user };
//       return typeof next === 'function' ? next() : res.json(user);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('User not found');
//     }
//   }
// };
