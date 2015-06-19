// Requires
var handlebars = require('handlebars');
var express = require('express');
var fs = require('fs');
var _ = require('lodash');

// Config
var defaults = {description: "A library database software", author: "charmoniumQ", title: "Alexandria", site: "Alexandria", footer: "Project Alexandria by charmoniumQ, 2015"};
// TODO: async file read
var template_string = fs.readFileSync('./views/template.html', {encoding: 'utf8'});
var template_func = handlebars.compile(template_string);

function renderMain(file) {
	// TODO: make asynchronous
	// TOOD: File encoding
	var content = fs.readFileSync('./views/' + file);
	return template_func(_.assign(defaults, {content: content}));
}

// Actual stuff
module.exports = function (app) {
	// TODO: express routing
	// TODO: log request

	app.use(express.static('./public'));

	// Content
	app.get('/', function (req, res) {
		res.send(renderMain('index.html'));
	});

	app.get('/input', function (req, res) {
		res.send(renderMain('input.html'));
	});
};
