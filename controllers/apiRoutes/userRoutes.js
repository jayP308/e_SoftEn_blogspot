const router = require('express').Router();
const { Users, Reviews } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        const userData = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.json(userData);
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

        res.json(reviewData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;