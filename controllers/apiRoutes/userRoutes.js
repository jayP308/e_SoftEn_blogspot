const router = require('express').Router();
const { Users } = require('../../models');

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

module.exports = router;