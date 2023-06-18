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
    try{
        const userLogin = await Users.findOne({
            where: {
                username: req.body.username,
            },
        });

        if(!userLogin) {
            req.status(400).json({ message: 'Incorrect Username. Please Try Again!'})
            return;
        }

        const validPassword = await userLogin.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Password. Please Try again!'});
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ user: userLogin, message: 'Logged In Successfully'});
        })

        
    } catch (err) {
        res.status(500).json(err);
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