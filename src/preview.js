var request = require('request');
var util = require('util');
var fs = require('fs');
var handlebars = require('handlebars');

/*
Book data
Amazon Product Advertising API: http://docs.aws.amazon.com/AWSECommerceService/latest/DG/EX_LookupbyISBN.html
Amazon Product Advertising API: http://blog.engelke.com/2011/12/11/chrome-web-app-bookshelf-part-3/
Amazon: http://manas.tungare.name/blog/howto-obtain-metadata-for-a-book-given-its-isbn-using-amazon-web-services-in-php/
ISBNdb: http://isbndb.com/api/v2/docs
Google Book API: https://developers.google.com/books/docs/v1/using
Open Library: https://openlibrary.org/dev/docs/api/books
https://bibwild.wordpress.com/2009/05/19/alternatives-to-amazon-api/
*/

var APIkey = fs.readFileSync('./src/api_key', 'utf8');

function lookup(ISBN, callback) {
	var params = {
		url: 'https://www.googleapis.com/books/v1/volumes',
		qs: {
			q: util.format('isbn:%s', ISBN),
			key: APIkey
		}
	};
	request(params, function (err, response, body) {
		// TODO: log err
		if (err) {
			callback(null);
		}
		var body_json = JSON.parse(body);
		if (body_json.totalItems == 0) {
			callback(null);
		}
		callback(body_json.items[0].volumeInfo);
	});
}

// TODO: handlebar partials
var preview_string = fs.readFileSync('./views/preview.html', 'utf8');

var preview_function = handlebars.compile(preview_string);

module.exports = function (form, callback) {
	lookup(form.ISBN, function (bookdata) {
		if (bookdata) {
			var params = {
				title: util.format('%s: %s', bookdata.title, bookdata.subtitle),
				authors: bookdata.authors.join(', '),
				image: bookdata.imageLinks.thumbnail,
				notes: form.notes,
				position: util.format('Number %d from the left (on the %s)', form.position, form.shelf)
			};
			callback(preview_function(params));
		} else {
			// TODO: actual error page
			callback('Error');
		}
	});
};
