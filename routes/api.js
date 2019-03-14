/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

require('dotenv').config();

const CONNECTION_STRING = process.env.DATABASE; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  MongoClient.connect(process.env.DATABASE, function(err, db) {
    if(err) {
      console.log('Database error: ' + err)
    } else {
      console.log('Database success: ' + db)
    }
    app.route('/api/issues/:project')
      .get(function (req, res){
        var project = req.params.project;
        // console.log(`GET project ${project}`);
      })
      
      .post(function (req, res){
        var project = req.body;
        console.log(`POST project ${JSON.stringify(project)}`);
      })
      
      .put(function (req, res){
        var project = req.params.project;
        
      })
      
      .delete(function (req, res){
        var project = req.params.project;
        
      });
  })

    
};
