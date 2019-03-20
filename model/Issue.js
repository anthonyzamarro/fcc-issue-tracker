const Issue = require('./IssueSchema');
const moment = require('moment');

const createIssue = (issue, cb) => {
	console.log(`Issue createIssue issue`, issue.body)
	const newIssue = new Issue({
		title: issue.body.issue_title,
		text: issue.body.issue_text,
		author: issue.body.created_by,
		assignee: issue.body.assigned_to,
		statusText: issue.body.status_text,
		createdOn: new Date(),
		updatedOn: null,
		open: false
	})
	newIssue.save((err) => {
		if (err) {
			cb(err, 400)
		} else {
			const response = { ...newIssue, "id": newIssue._id }
			cb(response, 200)
		}
	})
}

const updateIssue = (issue, cb) => {
  console.log(`Issue updateIssue:`, issue.body);
//   Issue.findById(issue.body._id, (err, doc) => {
//     if (err) console.log(`ISSUE updateIssue error`, err);
//     doc.title = issue.body.issue_title,
//     doc.updatedOn = new Date()
    
//   })
  Issue.findByIdAndUpdate(issue.body._id, {title: issue.body.issue_title, updatedOn: new Date()}, (err, doc) => {
    console.log(doc)
  })
}

module.exports = {
	createIssue,
  updateIssue
}
