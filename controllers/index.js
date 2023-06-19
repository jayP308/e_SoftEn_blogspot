const router = require('express').Router();

const apiRoutes = require('./apiRoutes');
const homepageRoutes = require('./homepageRoutes.js')

router.use('/api', apiRoutes);
router.use('/', homepageRoutes);

module.exports = router;