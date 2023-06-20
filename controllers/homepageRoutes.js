const router = require('express').Router();
const { Info } = require('luxon');
const { Users } = require('../models');

router.get('/', async (req, res) => {
   res.render('homepage', {
    loggedIn: req.session.loggedIn,
   });
});

router.get('/home', async (req, res) => {
  res.render('homepage', {
   loggedIn: req.session.loggedIn,
  });
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
      res.render('homepage', {
        loggedIn: req.session.loggedIn,
       });
    }
    res.render('login');
  });

  router.get('/profile', async (req, res) => {
    if (req.session.loggedIn) {
      try {
        const username = req.session.username; // Assuming you have the logged-in user's username stored in req.session.username
        const userSignupData = await Users.findOne({ where: { username } }); // Find a single user by the username
        
        if (!userSignupData) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        const user = userSignupData.get({ plain: true });
  
        res.render('profile', {
          user,
          loggedIn: req.session.loggedIn || null
        });
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.render('/login');
    }
  });
  
  
router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
     });
  }
  res.render('signup');
});

module.exports = router;