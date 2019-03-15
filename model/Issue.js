const Issue = require('./IssueSchema');

const createIssue = (issue, cb) => {
	console.log(`Issue createIssue issue`, issue)
	const newIssue = new Issue({
		title: issue.issue_title
	})
	newIssue.save((err) => {
		if (err) {
			console.log(`newIssue error`, err)
		}
	})
	const response = { "title": newIssue.title, "id": newIssue._id };
	return cb(response, 200)
}

module.exports = {
	createIssue
}