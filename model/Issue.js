const {Issue, Project} = require('./Schema');
const moment = require('moment');

const getAllProjects = (projects, cb) => {
  Project.find({}, (err, docs) => {
    if (err) {
      cb(400, docs);
    } else {
      cb(docs, 200)
    }
  })
}

const createProject = (project, cb) => {
	// console.log(`Issue.js createProject`, project.body)
	const newProject = new Project({
		title: project.body.project_title
	})
	newProject.save((err) => {
		if (err) {
			cb(err, 400)
		} else {
			const response = {...newProject, "id": newProject._id}
			cb(response, 200)
		}
	})
}

const getIssues = (projectId, cb) => {
  Project.findById(projectId, (err, doc) => {
    if(err) {
      cb(err, 400);
    } else {
      cb({'title':doc.title, 'issues': doc.issues}, 200);
    }
  });
}

const filterIssues = (issue, cb) => {
  let projectId = issue.params.project
  let searchTitle = issue.body.title;
  let text = issue.body.text;
  let author = issue.body.author;
  let assignee = issue.body.assignee;
  let statusText = issue.body.statusText;
  let createdOn = issue.body.createdOn;
  let updatedOn = issue.body.updatedOn;
  let open = issue.body.open == 'on' ? true : false;
  // console.log('Issue.js filteredIssues issue', issue.params.project, issue.body, open);

  Project.aggregate([
      {$project: 
        {
          issues: {
            $filter: {
              input: '$issues',
              as: 'issue',
              cond: { $or: [
                  {$eq: ['$$issue.title', searchTitle]},
                  {$eq: ['$$issue.text', text]},
                  {$eq: ['$$issue.author', author]},
                  {$eq: ['$$issue.assignee', assignee]},
                  {$eq: ['$$issue.statusText', statusText]},
                  {$eq: ['$$issue.createdOn', createdOn]},
                  // {$eq: ['$$issue.updatedOn', updatedOn]},
                  // {$eq: ['$$issue.open', open]},
                ]}
            }
          }
        }
      }
    ]).then(data => {
      // console.log('data',data);
      Project.findById(projectId, (err, doc) => {
        if (err) console.log('Issue.js filteredIssue err', err)
        data.filter(d => {
          if (d._id == projectId) {
            console.log(d)
            cb(d, 200);
          }
        })
      })
    })
}

const createIssue = (issue, cb) => {
	const projectId = issue.params.project;

	Project.findById(projectId, (err, doc) => {
		if (err) {
			// console.log('Issue.js createIssue Project.findById err', err);
      cb(err, 400);
		}
		const newIssue = new Issue({
			title: issue.body.issue_title,
			text: issue.body.issue_text,
			author: issue.body.created_by,
			assignee: issue.body.assigned_to,
			statusText: issue.body.status_text,
			createdOn: new Date(),
			updatedOn: new Date(),
			open: true
		})
		doc.issues.push(newIssue);
    doc.markModified('issues');
    doc.save();
    
    const response = {...newIssue, "id": newIssue._id}
		cb(response, 200)
	});
}

const updateIssue = (issue, cb) => {
  const projectId = issue.params.project;
  const issueId = issue.body._id
  const objCopy = {...issue.body}
  	/*
  		remove the _id from objCopy because we need to check
  		if all other propertys are empty. _id will always
  		have a value, so we must remove it.
  	*/ 
  	delete objCopy._id
  	let empty = Object.keys(objCopy).every(prop => {
  		return objCopy[prop] === '';
  	});

  Project.findById(projectId, (err, doc) => {
    if(err) {
      cb('Could not update ' + issueId, 400);
    } else {
    	let filteredIssue = doc.issues.filter(is => {if (is._id == issueId) return is});
    	let ourIssue = filteredIssue[0];
    	if (empty) {
  			ourIssue.updatedOn = moment().format('YYYY-MM-DD hh:mm a');
    		doc.markModified('issues');
	      doc.save();
    		cb('no updated field sent', 200);
    	} else {
        // console.log(ourIssue, issue.body)
	      ourIssue.title = issue.body.issue_title == '' || issue.body.issue_title == undefined ? ourIssue.title : issue.body.issue_title;
        ourIssue.text = issue.body.issue_text == '' || issue.body.issue_text == undefined ? ourIssue.text : issue.body.issue_text;
        ourIssue.author = issue.body.created_by == '' || issue.body.created_by == undefined ? ourIssue.author : issue.body.created_by;
        ourIssue.assignee = issue.body.assigned_to == '' ? ourIssue.assignee : issue.body.assigned_to;
        ourIssue.statusText = issue.body.status_text == '' ? ourIssue.statusText : issue.body.status_text;
        ourIssue.open = issue.body.open == 'on' || issue.body.open == 'true' ? ourIssue.open = false : issue.body.open = true;
        ourIssue.updatedOn = moment().format('YYYY-MM-DD hh:mm a');
	      doc.markModified('issues');
	      doc.save();
	      cb('successfully updated', 200);
    	}

    }
  })
}

const deleteIssue = (issue, cb) => {
  // console.log('WE HAVE REACHED DELETE', issue)
  const projectId = issue.params.project;
  const issueId = issue.body._id;
  if (issueId == '') {
    cb('_id error', 200);
  } else {
    Project.findById(projectId, (err, doc) => {
      if(err) cb('could not delete' + issueId, 400);
      let filteredIssues = doc.issues.filter((i, index) => {
          if (i._id != issueId) {
            return i;
          }
        });
      cb('success: deleted ' + issueId, 200);
      doc.issues = filteredIssues;
      doc.markModified('issues');
      doc.save();
    });
  }
}

module.exports = {
  getAllProjects,
  createProject,
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  
  filterIssues
}
