'use strict';
const body = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());

const port = process.env.PORT || 8081;

app.get(/.*/, (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
})

try{
    https
        .createServer(
            {
                key: fs.readFileSync(path.resolve(__dirname, 'cert', 'key.pem')),
                cert: fs.readFileSync(path.resolve(__dirname, 'cert', 'cert.pem')),
            },
            app
        )
        .listen(port, function () {
            console.log(`Server listening port ${port}`);
        });
}catch (e) {
    app.listen(port, function () {
        console.log(`Server listening port ${port}`);
    });
}
