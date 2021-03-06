// Requires
var handlebars = require('handlebars');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('lodash');

var rest = require('./rest')

// Config
var defaults = {description: "A library database software", author: "charmoniumQ", title: "Alexandria", site: "Alexandria", footer: "Project Alexandria by charmoniumQ, 2015"};
// TODO: async file read with partial template application
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

function pluralify(list) {
	// TODO: handlebars helper
	if (list.length === 1) {
		return list[0];
	}
	if (list.length == 2) {
		return list.join(' and ');
	}
	rest = list.slice(0, -1);
	last = list.slice(-1)[0];
	return rest.join(', ') + ', and ' + last;
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

	app.get('/create', function (req, res) {
		res.send(renderFile('create.html'));
		// Test ISBN: 0394741714
		//            0449210928
		//            0316069582
		//            0890969108
	});

	app.get('/edit', function (req, res) {
		rest.extras.get_document(req.query.id, function (book) {
			// TODO: handlebar partials
			var edit_string = fs.readFileSync('./views/edit.html', 'utf8');
			var edit_function = handlebars.compile(edit_string);
			var edit_content = edit_function({book: book, authors: pluralify(book.authors)});
			res.send(renderContent(edit_content));
		});

	});

	app.get('/view', function (req, res) {
		rest.extras.get_document(req.query.id, function (book) {
			var view_string = fs.readFileSync('./views/view.html', 'utf8');
			var view_function = handlebars.compile(view_string);
			var view_content = view_function({book: book, authors: pluralify(book.authors)});
			res.send(renderContent(view_content));
		});
	});

	app.get('/search', function (req, res) {
		res.send(renderFile('search.html'));
	});

	app.get('/virtualshelf', function (req, res) {
	});

	app.use('/rest', rest);
};
