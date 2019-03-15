const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE || 'mongodb://localhost/exercise-track' )

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title:  String,
    text: String,
    author: String,
    assignee: String,
    statusText: String,
    createdOn: Date,
    updatedOn: Date,
    open: Boolean
  });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;