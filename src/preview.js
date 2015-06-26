var handlebars = require('handlebars');
var _ = require('lodash')

var database = require('./database');


module.exports = function (form, callback) {
	lookup(form.originalISBN, function (book) {
		if (book) {
			var book = new database.BookOut(_.assign(book, form));
			console.log(book);
			book.save();
			callback(preview_function();
		} else {
			// TODO: actual error page
			callback('Error');
		}
	});
};
