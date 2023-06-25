const router = require('express').Router();
const { Users, Reviews } = require('../../models');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: './public/images', // Specify the destination directory for storing uploaded images
  filename: function (req, file, cb) {
    // Generate a unique file name for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});
const upload = multer({ storage: storage });

const storage1 = multer.diskStorage({
  destination: './public/reviewImages', // Specify the destination directory for storing uploaded images
  filename: function (req, file, cb) {
    // Generate a unique file name for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and MP4 files are allowed.'));
  }
};
const upload1 = multer({ storage: storage1, fileFilter: fileFilter });

router.post('/signup', upload.single('profileImage'), async (req, res) => {
  try {
    const userData = await Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profileImage: req.file ? req.file.filename : null // Store the filename if a file was uploaded, otherwise store null
    });

    req.session.loggedIn = true;
    req.session.username = req.body.username;
    req.session.user = userData;

    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
      req.session.user = user;

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

router.post('/updateProfileImage', upload.single('profileImage'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (req.file) {
      const username = req.session.username;

      // Update the profile image in the database
      await Users.update({ profileImage: req.file.filename }, { where: { username } });

      res.sendStatus(200);
    } else {
      res.status(400).json({ message: 'No file uploaded' });
    }
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.sendStatus(500);
  }
});

router.post('/reviews', upload1.single('postImage'), async (req, res) => {
  try {
    const { topic, description } = req.body;
    const userId = req.session.user.id;
    const postImage = req.file; // Get the uploaded image data

    const reviewData = await Reviews.create({
      topic,
      description,
      userId,
      postImage: postImage ? postImage.filename : null, // Store the filename in the 'postImage' column, or null if no image is uploaded
    });

    req.session.loggedIn = true;

    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;