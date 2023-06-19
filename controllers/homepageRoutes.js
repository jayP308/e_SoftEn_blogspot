const router = require('express').Router();

router.get('/', async (req, res) => {
   res.render('homepage', {
    loggedIn: req.session.loggedIn,
   });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
});

router.get('/signup/:userId', async (req, res) => {
  try{ 
      const { userId } = req.params;

      const userData = await Reviews.findByPk(userId);

      const user = userData.get({ plain: true });

      res.render('user-info', {
          user
      });
  } catch (error) {
      res.status(500).json({error});
  }
});

module.exports = router;