var request = require('request');
var util = require('util');
var fs = require('fs');
var _ = require('lodash')

/*
Book data
Amazon Product Advertising API: http://docs.aws.amazon.com/AWSECommerceService/latest/DG/EX_LookupbyISBN.html
Amazon Product Advertising API: http://blog.engelke.com/2011/12/11/chrome-web-app-bookshelf-part-3/
Amazon: http://manas.tungare.name/blog/howto-obtain-metadata-for-a-book-given-its-isbn-using-amazon-web-services-in-php/
ISBNdb: http://isbndb.com/api/v2/docs
> Google Book API: https://developers.google.com/books/docs/v1/using
Open Library: https://openlibrary.org/dev/docs/api/books
https://bibwild.wordpress.com/2009/05/19/alternatives-to-amazon-api/
*/

var APIkey = fs.readFileSync('./src/api_key', 'utf8');

function lookup(form, callback) {
	var params = {
		url: 'https://www.googleapis.com/books/v1/volumes',
		qs: {
			q: util.format('isbn:%s', form.originalISBN),
			key: APIkey
		}
	};
	request(params, function (err, response, body) {
		// TODO: log err
		if (err) {
			callback(err, undefined);
		} else {
			var body_json = JSON.parse(body);
			if (body_json.totalItems == '0') {
				callback('No results', undefined);
			} else {
				var book = _.assign(body_json.items[0].volumeInfo, form);
				callback(undefined, book);
			}
		}
	});
}

module.exports = lookup
