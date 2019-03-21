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

const createIssue = (issue, cb) => {
	const projectId = issue.params.project;

	Project.findById(projectId, (err, doc) => {
		if (err) {
			console.log('Issue.js createIssue Project.findById err', err);
      cb(err, 400);
		}
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
  
  Project.findById(projectId, (err, doc) => {
    if(err) {
      console.log('Issue.js updateIssue error', err);
      cb('Could not updated' + issueId, 400);
    } else {
      doc.issues.forEach(is => {
        console.log(is, issue.body)
        if (is._id == issueId) {
          is.title = issue.body.issue_title == '' ? is.title : issue.body.issue_title;
          is.text = issue.body.issue_text == '' ? is.text : issue.body.issue_text;
          is.author = issue.body.created_by == '' ? is.author : issue.body.created_by;
          is.assignee = issue.body.assigned_to == '' ? is.assignee : issue.body.assigned_to;
          is.statusText = issue.body.status_text == '' ? is.statusText : issue.body.status_text;
          is.updatedOn = new Date();
        }
      });
      doc.markModified('issues');
      doc.save();
      cb('successfully updated', 200);
    }
  })
}

module.exports = {
  getAllProjects,
  createProject,
	createIssue,
  updateIssue
}
