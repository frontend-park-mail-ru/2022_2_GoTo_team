'use strict';
//const Handlebars = require("handlebars");
const body = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());

const port = process.env.PORT || 8081;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
