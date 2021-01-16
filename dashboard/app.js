const bodyParser = require('body-parser');
const cookies = require('cookies');
const express = require('express');
const methodOverride = require('method-override');
const middleware = require('./middleware');
const rateLimit = require('./rate-limiter');
const { PORT } = require("../config")

const authRoutes = require('./views/routes/auth-routes');
const rootRoutes = require('./views/routes/root-routes');
const dashboardRoutes = require('./views/routes/dashboard-routes');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(rateLimit);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookies.express('a', 'b', 'c'));

app.use('/',
  middleware.updateUser, rootRoutes,
  authRoutes,
  middleware.validateUser, middleware.updateGuilds, dashboardRoutes
);
app.all('*', (req, res) => res.redirect('/'));

const port = PORT;
app.listen(port, () => console.log(`Server started on port ${port}`))