#!/usr/bin/env node

// Config
var PORT = 3000;

// Required
var express = require('express');
var http = require('http');
var path = require("path");

var log = require('./log');
var pages = require('./pages');

log.info(". = %s", path.resolve("."));
log.info("__dirname = %s", path.resolve(__dirname));

var app = express();
pages(app, log); // apply routing
var server = http.createServer(app);
server.listen(PORT);
log.info('Listening on ' + PORT);
