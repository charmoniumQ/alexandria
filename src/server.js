#!/usr/bin/env node

// Config
var PORT = 3000;

// Required
var express = require('express');
var http = require('http');
var path = require("path");

// TODO: logging
var pages = require('./pages');

var app = express();
pages(app); // apply routing
var server = http.createServer(app);
server.listen(PORT);
console.log('Listening on ' + PORT);
