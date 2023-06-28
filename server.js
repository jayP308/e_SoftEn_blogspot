const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path')

const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const port = 3001;

const app = express();

const sess = {
    secret: '@Junnelpadilla308',

    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },

    user: null,
    review: null,
    resave: false,
    saveUninitialized: true,

    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync ({ force: false }).then(() => {
    app.listen(process.env.PORT || port, () => console.log(`App is running on PORT http://localhost:${port}`));
});
