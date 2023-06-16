const express = require('express');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync ({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App is running on PORT http://localhost:${PORT}`));
});
