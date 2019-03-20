/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var controller = require('../controller/handleIssues');
var expect = require('chai').expect;

module.exports = function (app) {
    app.route('/')
        .post(controller.createProject)
  
    app.route('/api/issues/:project')
        .get(controller.getIssues)
        .post(controller.newIssue)
        .put(controller.updateIssue)
  
    // app.route('/api/issues/:project?_id')
      // .get(function (req, res){
      //   var project = req.params.project;
      //   console.log(`GET project ${project}`);
      // })
      
    //   .post(function (req, res){
    //     var project = req.body;
    //     // console.log(`POST project ${JSON.stringify(project)}`);
    //     console.log(`POST project ${req.db}`);

    //   })
      
//       .put(function (req, res){
//         var project = req;
      
//         console.log('PUT in api.js', project);
        
//       })

      
    //   .delete(function (req, res){
    //     var project = req.params.project;
        
    //   });
    
};

/*
  create a model folder
  require mongoose
  create a Schema for our data
  create a model.js file to represent the data from the MongoDB
    - the model will handle creating and saving issues to the database with createIssues
    - it will return issues with getAllIssues
    - update an issue with updateIssue
    - delete an issue with deleteIssue
  export the model to be used in our controller
  
  the controller will handle the sending CRUD behavior of the application to model
  we will getIssues by listening to /api/issues/fcc?getIssues
    - we will query the url and return all issues for the project and all information related to each issue
    - user will see list of all issues
  we will postIssues by listening to /api/issues/fcc?newIssue
    - when the form is submitted, query the url for the information submitted by the user, and pass that information to our model to create a new issue
    - user will see new issues added to top of the liste (bottom?) and confirmation that issue was created
  we will updateIssue by listening to /api/issues/fcc?updateIssue={issue id}
    - when user clicks 'edit issue' issue in list, we will PUT that in the url, grab it in our controller, and pass it to our model to update it
    - user will see the issue they clicked be updated and some notification indicating that the issue has been updated
  we will deleteIssue by listening to /api/issues/fcc?deleteIssue={issue id}
    - when user clicks 'delete issue' we will DELETE it by passing the id through the url, grab it in our controller, and pass the id to our model to delete 
    - user will see issue he/she clicked on removed from the list and a confirmation that the issue was deleted
*/

