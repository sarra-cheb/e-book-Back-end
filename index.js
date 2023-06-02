const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const passport = require('passport')
const dotenv = require('dotenv');
const path = require('path');

const port = process.env.PORT || 4000;
dotenv.config();
const app = express();

require('./DataBase/Connect')
require('./Passport/Bearer')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyparser.json())
app.use('/Books', express.static(path.join(__dirname, './Books')))

app.use(require('express-session')({ secret: process.env.JWTSECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./Routes/AuthApi'))
app.use('/api', require('./Routes/UserApi'))
app.use('/api', require('./Routes/BookApi'))
app.use('/api', require('./Routes/CategoryApi'))
app.use('/api', require('./Routes/DownloadAPI'))
app.listen(port, console.log('App running on port ' + port)
)