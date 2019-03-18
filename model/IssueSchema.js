const mongoose = require('mongoose')
// require dotenv to read .env variables
require('dotenv').config();
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title:  {
    	type: String,
    	required: true
    },
    text: {
    	type: String,
    	required: true
    },
    author: {
    	type: String,
    	required: true
    },
    assignee: String,
    statusText: String,
    createdOn: Date,
    updatedOn: Date,
    open: Boolean
  });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;