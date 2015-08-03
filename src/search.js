var database = requrie('./database');

var byTitle = function (titleSubstring, callback) {
	database.BookOut.find({title: new RegExp(titleSubstring)}, function (err, books) {
		callback(books);
		// TODO: log err
	});
};

// by ISBN
var byISBN = function (ISBNSubstring, callback) {
	database.BookOut.find({'industryIdentifiers.identifier': new RegExp(ISBNSubstring)}, function (err, books) {
		callback(books);
		// TODO: log err
	});
};

var byAuthor = function (authorSubstring, callback) {
	database.BookOut.find({'author': nwe RegExp(authorSubstring)}, function (err, callback) {
		callback(books);
		// TODO: log err
	});
};

var byDescription = function (descriptionSubstring, callback) {
	database.BookOut.find({description: new RegExp(titleSubstring)}, function (err, books) {
		callback(books);
		// TODO: log err
	});
};

// TODO: by similar books
