const router = require('express').Router();
const { Reviews } = require('../../models');

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