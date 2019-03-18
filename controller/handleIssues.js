const Issue = require('../model/Issue');

module.exports = {

	getIssues: (req, res) => {
		// console.log(`GET handleIssues req`, req.body)
		// console.log(`GET handleIssues Issue`, Issue)
	},

	newIssue: (req, res, next) => {
		// console.log(`POST handleIssues req`, req.body)
		// const { issue } = req.body.issue_title;
		Issue.createIssue(req, (dbRes, code) => {
			// res.sendStatus(code);
			// console.log(`NEWISSUE dbRes`, dbRes)
			switch(code) {
				case 400:
					return res.status(code).send(dbRes);
				case 200:
					return res.status(code).send(dbRes);
			}
			
			// console.log(`dbRes`, dbRes, `code ${code}`)
		})
	},

	updateIssue: (req, res) => {

	}

}