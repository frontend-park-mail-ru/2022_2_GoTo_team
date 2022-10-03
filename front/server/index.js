'use strict';
const Handlebars = require("handlebars");
const express = require('express');
const path = require('path');
const app = express();
const helpers = require('prettify');
helpers.register(Handlebars);

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    const id = req.cookies['podvorot'];
    const emailSession = ids[id];
    if (!emailSession || !users[emailSession]) {
        return res.status(401).end();
    }

    const result = Object
        .values(users)
        .filter(({email}) => email !== emailSession)
        .map(user => user.images)
        .filter(Boolean)
    ;

    res.json(result.flat());
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
