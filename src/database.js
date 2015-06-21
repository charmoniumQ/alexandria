var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

// TODO: handle database connection failure

var BookInSchema = mongoose.Schema({
	ISBN: String,
	shelf: String,
	position: Number,
	notes: String
});

var SingleIndustrySchema = mongoose.Schema({
	"type": String,
	"identifier": String
});

var BookIn = mongoose.model('BookIn', BookInSchema);

var BookOutSchema = mongoose.Schema({
	"title": String,
	"subtitle": String,
	"authors": [String],
	"publisher": String,
	"publishedDate": String,
	"description": String,
	"industryIdentifiers": [SingleIndustrySchema],
	"pageCount": Number,
	"dimensions": {
		"height": String,
		"width": String,
		"thickness": String
	},
	"printType": String,
	"mainCategory": String,
	"categories": [String],
	"averageRating": Number,
	"ratingsCount": Number,
	"contentVersion": String,
	"imageLinks": {
		"smallThumbnail": String,
		"thumbnail": String,
		"small": String,
		"medium": String,
		"large": String,
		"extraLarge": String
	},
	"language": String,
	"previewLink": String,
	"infoLink": String,
	"canonicalVolumeLink": String,

	"originalISBN": String,
	"position": Number,
	"shelf": String,
	"notes": String
});

var BookOut = mongoose.model('BookOut', BookOutSchema);

module.exports = {BookIn: BookIn, BookOut: BookOut};
