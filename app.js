const express = require('express');
const http = require('http');
const mporgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();
const router = require('./router');

// db setup
mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// app setup
app.use(mporgan('dev'));

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
router(app);

// server app
http.createServer(app).listen(5000);
