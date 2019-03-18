const Issue = require('./IssueSchema');
const moment = require('moment');

const createIssue = (issue, cb) => {
	// console.log(`Issue createIssue issue`, issue.body)
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

module.exports = {
	createIssue
}
