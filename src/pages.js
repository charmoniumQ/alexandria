// Requires
var hbs = require('hbs');
var express = require('express');
var _ = require('lodash');

// Config
var defaults = {description: "A library database software", author: "charmoniumQ", title: "Alexandria", site: "Alexandria", footer: "Project Alexandria by charmoniumQ, 2015"}

// Actual stuff
module.exports = function (app, log) {
	// Logging
	app.use(function(req, res, next){
		log.info(req.method + ' ' + req.url);
		next();
	});

	// Engines
	app.use(express.static('./public'));
	app.set('view engine', 'html');
	app.engine('html', hbs.__express);

	// Content
	app.get('/', function(req, res) {
		res.render('main.html', _.assign(defaults, {content: "<h1>What?</h1>"}));
	});
};
