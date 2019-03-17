const Issue = require('../model/Issue');

module.exports = {

	getIssues: (req, res) => {
		console.log(`GET handleIssues req`, req.body)
		console.log(`GET handleIssues Issue`, Issue)
	},

	newIssue: (req, res) => {
		// console.log(`POST handleIssues req`, req.body)
		// const { issue } = req.body.issue_title;
		Issue.createIssue(req.body, (dbRes, code) => {
			console.log(`dbRes`, dbRes, `code ${code}`)
		})
	}

}