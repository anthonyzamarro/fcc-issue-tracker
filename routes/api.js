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
    app.route('/api/projects')
        .get(controller.getProjects)
        .post(controller.createProject)
  
    app.route('/api/issues/:project')
        .get(controller.getIssues)
        .post(controller.newIssue)
        .put(controller.updateIssue)
        .delete(controller.deleteIssue)
  
    app.route('/api/issues/:project/:filters')
        .post(controller.filterIssues)
};
