const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');



app.use(favicon(__dirname + '/app/images/favicon.ico'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Root directory from which the static assets are to be served.
app.use(express.static(path.join(__dirname, 'app')));


// logger
app.use(morgan('common'));

app.get('/pr', function (req, res) {
  res.sendFile(path.join(__dirname, 'pr/index.html'));
});

// Otherwise render the index.html page for the Backbone SPA
// This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


app.listen(port);
console.log('Server started on port: ' + port);