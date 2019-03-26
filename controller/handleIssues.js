const Issue = require('../model/Issue');

module.exports = {
  
  getProjects: (req, res) => {
      // console.log('handleIssues.js getProjects dbRes, code', req)
    Issue.getAllProjects(req, (dbRes, code) => {
      // console.log('handleIssues.js getProjects dbRes, code', dbRes, code)
      res.status(code).send(dbRes);
    })
  },

	createProject: (req, res) => {
		Issue.createProject(req, (dbRes, code) => {
			// console.log('handleIssues.js createProject dbres, code', dbres, code)
			res.status(code).send(dbRes)
		})
	},

	createProject: (req, res) => {
		Issue.createProject(req, (dbres, code) => {
			return res.status(code).send(dbres)
		});
	},

	getIssues: (req, res) => {
	    Issue.getIssues(req.params.project, (dbRes, code) => {
	      return res.status(code).send(dbRes);
	    });
	},
  
  filterIssues: (req, res) => {
   	 	Issue.filterIssues(req, (dbRes, code) => {
    	  return res.status(code).send(dbRes);
    	});
  },
  
	newIssue: (req, res) => {
		Issue.createIssue(req, (dbRes, code) => {
      	  return res.status(code).send(dbRes);
		});
	},

	updateIssue: (req, res) => {
      Issue.updateIssue(req, (dbRes, code) => {
        return res.status(code).send(dbRes);
      });
	},
  
  deleteIssue: (req, res) => {
    Issue.deleteIssue(req, (dbRes, code) => {
      return res.status(code).send(dbRes);
    });
  }

}