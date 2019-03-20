const Issue = require('../model/Issue');

module.exports = {

	getIssues: (req, res) => {
		// console.log(`GET handleIssues req`, req.body)
		// console.log(`GET handleIssues Issue`, Issue)
	},

	newIssue: (req, res) => {
		Issue.createIssue(req, (dbRes, code) => {
			switch(code) {
				case 400:
					return res.status(code).send(dbRes);
				case 200:
					return res.status(code).send(dbRes);
			}
		});
	},

	updateIssue: (req, res) => {
    // console.log(`handleIssues updateIssue`, req.body);
    Issue.updateIssue(req, (dbRes, code) => {
      
    });
	}

}