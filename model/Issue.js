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
      console.log('Issue.js updateIssue error', err);
      cb('Could not updated' + issueId, 400);
    } else {


    	let filteredIssue = doc.issues.filter(is => {
	        if (is._id == issueId) {
	        	return is;
	          // console.log(is, issue.body)
	          // is.title = issue.body.issue_title == '' ? is.title : issue.body.issue_title;
	          // is.text = issue.body.issue_text == '' ? is.text : issue.body.issue_text;
	          // is.author = issue.body.created_by == '' ? is.author : issue.body.created_by;
	          // is.assignee = issue.body.assigned_to == '' ? is.assignee : issue.body.assigned_to;
	          // is.statusText = issue.body.status_text == '' ? is.statusText : issue.body.status_text;
	          // is.updatedOn = new Date();
	        }
	      });

    	let ourIssue = filteredIssue[0];
    	if (empty) {
			ourIssue.updatedOn = moment().format('YYYY-MM-DD hh:mm a');
			console.log(ourIssue);
    		doc.markModified('issues');
	      	doc.save();
    		cb('no updated field sent', 200);
    	} else {
	      // doc.issues.forEach(is => {
	        // if (is._id == issueId) {
	          // console.log(is, issue.body)
	          // is.title = issue.body.issue_title == '' ? is.title : issue.body.issue_title;
	          // is.text = issue.body.issue_text == '' ? is.text : issue.body.issue_text;
	          // is.author = issue.body.created_by == '' ? is.author : issue.body.created_by;
	          // is.assignee = issue.body.assigned_to == '' ? is.assignee : issue.body.assigned_to;
	          // is.statusText = issue.body.status_text == '' ? is.statusText : issue.body.status_text;
	          // is.updatedOn = new Date();
	        // }
	      // });
	      ourIssue.title = issue.body.issue_title == '' ? ourIssue.title : issue.body.issue_title;
	      doc.markModified('issues');
	      doc.save();
	      cb('successfully updated', 200);
    	}

    }
  })
}

module.exports = {
  getAllProjects,
  createProject,
  createIssue,
  updateIssue
}
