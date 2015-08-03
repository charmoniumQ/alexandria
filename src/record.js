var database = require('./database');

module.exports = function (input) {
	book = new database.BookOut(input);
	book.save();
}
