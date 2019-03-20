/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
// const chaiDom = require('chaiDom');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/fcc => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/fcc')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          const obj = res.body._doc;
          const { title, text, author, assignee, statusText } = obj;
          assert.equal(title, "Title");
          assert.equal(text, "text");
          assert.notEqual(author, "");
          assert.notEqual(assignee, "");
          assert.notEqual(statusText, "");
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
          .post('/api/issues/fcc')
          .send({
            issue_title: 'Title',
            assigned_to: 'Chai and Mocha',
            status_text: 'In QA'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            console.log('required fields', res);
            const obj = res.body._doc;
            const { title, text, author } = obj;
            assert.notEqual(title, "");
            assert.notEqual(text, "");
            assert.notEqual(author, "");
            done();
          })
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
          .post('/api/issues/fcc')
          .send({
            assigned_to: 'Chai and Mocha',
            status_text: 'In QA'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            console.log('missing fields', res)
            const obj = res.body._doc;
            const { title, text, author } = obj;
            assert.equal(title, "");
            assert.equal(text, "");
            assert.equal(author, "");
            // console.log('obj', obj)
            done();
          })
      });
      
    });
    
    suite('PUT /api/issues/fcc => text', function() {
      
      test('No body', function(done) {
        
      });
      
      test('One field to update', function(done) {
        
      });
      
      test('Multiple fields to update', function(done) {
        
      });
      
    });
    
    suite('GET /api/issues/fcc => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        
      });
      
    });
    
    suite('DELETE /api/issues/fcc => text', function() {
      
      test('No _id', function(done) {
        
      });
      
      test('Valid _id', function(done) {
        
      });
      
    });

});
