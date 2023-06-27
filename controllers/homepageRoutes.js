const router = require('express').Router();
const { Users, Reviews, Comments } = require('../models');
const _ = require('lodash');

router.get('/', async (req, res) => {
   res.render('homepage', {
    loggedIn: req.session.loggedIn,
   });
});

router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('signup');
});


router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
      return res.redirect('/');
    }
    res.render('login');
  });

router.get('/profile', async (req, res) => {
    try {
      if (req.session.loggedIn) {
        const userId = req.session.user.id;
  
        const userSignupData = await Users.findOne({ where: { username: req.session.username } });
        if (!userSignupData) {
          return res.status(404).json({ message: 'User not found' });
        }
        const user = userSignupData.get({ plain: true });
  
        const userReviews = await Reviews.findAll({ where: { userId } });
        const userReviewData = userReviews.map(review => {
          const reviewData = review.get({ plain: true });
          const createdAt = new Date(review.createdAt);
          reviewData.createdAt = createdAt.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          return reviewData;
        });
        
        return res.render('profile', {
          user,
          loggedIn: req.session.loggedIn,
          userReviewData,
        });
      } else {
        return res.redirect('/login');
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  });

router.delete('/reviews/:id', async (req, res) => {
    try {
      const reviewId = req.params.id;
      const userId = req.session.user.id;
  
      // Check if the review belongs to the current user
      const review = await Reviews.findOne({ where: { id: reviewId, userId } });
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Delete the review
      await Reviews.destroy({ where: { id: reviewId } });
  
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  

router.get('/feed', async (req, res) => {
    try {
      if (req.session.loggedIn) {
        const displayReviews = await Reviews.findAll({
          include: [{ model: Users, attributes: ['username', 'profileImage'] }] // Include the Users model to retrieve the associated user's username
        });
  
        const displayReviewData = displayReviews.map(review => {
          const reviewData = review.get({ plain: true });
          const createdAt = new Date(review.createdAt);
          reviewData.createdAt = createdAt.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          return reviewData;
        });
        
        const sortedReviewData = displayReviewData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
          return res.render('feed', {
          loggedIn: req.session.loggedIn,
          displayReviewData: sortedReviewData,
        });
      } else {
           return res.redirect('/login');
      }
    } catch (err) {
        res.status(500).json({ err });
    }
  });

  router.get('/comments/:id', async (req, res) => {
    try {
      if (req.session.loggedIn) {
        const reviewId = req.params.id;
        
        const displayComments = await Comments.findAll({
          where: { reviewId },
          include: [
            {
              model: Reviews,
              attributes: ['topic', 'description']
            },
            {
              model: Users,
              attributes: ['username', 'profileImage']
            }
          ]
        });
  
        const displayCommentsData = displayComments.map((comment) => comment.get({ plain: true }));
        console.log(displayCommentsData);
  
        return res.render('comments', {
          loggedIn: req.session.loggedIn,
          displayCommentsData,
        });
      } else {
        return res.redirect('/login');
      }
    } catch (err) {
      res.status(500).json({ err });
    }
  });  

module.exports = router;