const mongoose = require('mongoose')

const reqString = {
	type: string,
	required: true
}

const languageSchema = mongoose.Schema({
	_id: reqString,
	language: reqString
})

module.exports = mongoose.model('language', languageSchema)