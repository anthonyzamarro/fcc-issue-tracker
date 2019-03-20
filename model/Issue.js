const {Issue, Project} = require('./Schema');
const moment = require('moment');

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
	// console.log(`Issue createIssue issue`, issue)
	const issueInfo = issue.body.issueInfo;
	const projectId = issue.body.projectId;

	Project.findById(projectId, (err, doc) => {
		if (err) {
			console.log('Issue.js createIssue Project.findById err', error);
		}
		const newIssue = new Issue({
			title: issueInfo.issue_title,
			text: issueInfo.issue_text,
			author: issueInfo.created_by,
			assignee: issueInfo.assigned_to,
			statusText: issueInfo.status_text,
			createdOn: new Date(),
			updatedOn: null,
			open: false
		})

		console.log(newIssue);
		newIssue.save((err) => {
			if (err) {
				cb(err, 400)
			} else {
				const response = { ...newIssue, "id": newIssue._id }
				cb(response, 200)
			}
		})
		doc.issues.push(newIssue);
		// console.log('Issue.js createIssue Project.findById success', doc);
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
  	updateIssue,
  	createProject
}
