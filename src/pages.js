// Requires
var handlebars = require('handlebars');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('lodash');

var rest = require('./rest')

// Config
var defaults = {description: "A library database software", author: "charmoniumQ", title: "Alexandria", site: "Alexandria", footer: "Project Alexandria by charmoniumQ, 2015"};
// TODO: async file read
var template_string = fs.readFileSync('./views/template.html', {encoding: 'utf8'});
var template_func = handlebars.compile(template_string);

function renderContent(content) {
	return template_func(_.assign(defaults, {content: content}));
}

function renderFile(file) {
	// TODO: make asynchronous
	// TOOD: File encoding
	var content = fs.readFileSync('./views/' + file);
	return renderContent(content);
}

// Actual stuff
module.exports = function (app) {
	// TODO: express routing
	// TODO: log request

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(express.static('./public'));

	// Content
	app.get('/', function (req, res) {
		res.send(renderFile('index.html'));
	});

	app.get('/input', function (req, res) {
		res.send(renderFile('input.html'));
	});

	app.get('/edit', function (req, res) {
	});

	app.get('/view', function (req, res) {
	});

	app.get('/search', function (req, res) {
	});

	app.use('/rest', rest);
};
