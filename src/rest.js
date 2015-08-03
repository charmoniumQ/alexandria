var database = require('./database');
var lookup = require('./lookup');
var express = require('express')
var bodyParser = require('body-parser');
var _ = require('lodash');

var BookOut = database.BookOut;

var list_documents = function (callback) {
	BookOut.find(function (err, books) {
		// TODO: handle errors
		callback(books);
	});
}

var create_document = function (form, callback) {
	// TODO: validation
	lookup(form, function (err, book_json) {
		// TODO: handle errors
		var book = new BookOut(book_json);
		book.save(function (err) {
			callback(book);
		});
	});
};

var get_document = function (id, callback) {
	BookOut.findById(id, function (err, book) {
		// TODO: handle errors
		callback(book);
	});
};

var update_document = function (id, form, callback) {
	// TODO: validation
	BookOut.findById(id, function (err, book) {
		// TODO: handle errors
		book.notes = form.notes;
		book.position = form.position;
		book.shelf = form.shelf;
		book.save(function (err) {
			// TODO: handle errors
			callback(book);
		});
	});
};

var delete_document = function (id, callback) {
	BookOut.findById(id, function (err, book) {
		// TODO: handle errors
		book.remove(function (err) {
			// TODO: handle errors
			callback();
		});
	});
};

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function (req, res) {
	list_documents(function (books) {
		res.json(books);
	});
});

router.post('/', function (req, res) {
	create_document(req.body, function (book) {
		res.json(book);
	})
});

router.get('/:id', function (req, res) {
	get_document(req.params.id, function (book) {
		res.json(book);
	});
});

router.put('/:id', function (req, res) {
	update_document(req.params.id, req.body, function () {
		res.json(book);
	});	
});

router.delete('/:id', function (req, res) {
	delete_document(req.params.id, function() {
		res.json({success: true});
	});
});

router.post('/:id', function (req, res) {
	if (req.body.delete) {
		delete_document(req.params.id, function () {
			res.json({success: true});
		});
	} else {
		update_document(req.params.id, req.body, function (book) {
			res.json(book);
		});
	}
});

module.exports = router;
module.exports.extras = {};
module.exports.extras.list_documents = list_documents;
module.exports.extras.create_document = create_document;
module.exports.extras.get_document = get_document;
module.exports.extras.update_document = update_document;
module.exports.extras.delete_document = delete_document;

/*
TODO: refactor properties:
module.exports = {list, create, get, update, delete, router}
*/
