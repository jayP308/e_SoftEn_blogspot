const router = require('express').Router();
const { Users, Reviews } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        const userData = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.json(userData);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/reviews', async (req, res) => {
    try {
        const reviewData = await Reviews.create({
            topic: req.body.topic,
            description: req.body.description,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.json(reviewData);
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await Users.findOne({ where: { username } });
  
      if (!user) {
        return res.status(400).json({ message: 'Incorrect username. Please try again.' });
      }
  
      const isValidPassword = await user.checkPassword(password);
  
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Incorrect password. Please try again.' });
      }
  
      req.session.loggedIn = true;
      req.session.username = username;
  
      res.redirect('/profile'); // Redirect to the profile route after successful login
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  

router.post('/logout', async(req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() =>{
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;