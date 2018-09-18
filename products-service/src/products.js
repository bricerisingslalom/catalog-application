var express = require('express');
var app = express();
var queries = require('./queries.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get('/:productId', function (req, res) {
  queries.get(req.params['productId'], res);
});

app.put('/', function (req, res) {
  queries.put(req.body, res);
});

app.delete('/:productId', function (req, res) {
  queries.delete(req.params['productId'], res);
});

app.get('/', function (req, res) {
  queries.scan(res);
});
