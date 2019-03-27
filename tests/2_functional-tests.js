/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect
var server = require('../server');

chai.use(chaiHttp);

let issueId;

suite('Functional Tests', function() {
  
    suite('POST /api/issues/5c983624f42ebc6cd2a72415 => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/5c983624f42ebc6cd2a72415')
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

          issueId = obj._id

          assert.equal(title, "Title");
          assert.equal(text, "text");
          assert.equal(author, "Functional Test - Every field filled in");
          assert.equal(assignee, "Chai and Mocha");
          assert.equal(statusText, "In QA");
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
          .post('/api/issues/5c983624f42ebc6cd2a72415')
          .send({
            issue_title: 'Title',
            assigned_to: 'Chai and Mocha',
            status_text: 'In QA'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
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
          .post('/api/issues/5c983624f42ebc6cd2a72415')
          .send({
            assigned_to: 'Chai and Mocha',
            status_text: 'In QA'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            const obj = res.body._doc;
            const { title, text, author } = obj;
            assert.isUndefined(title);
            assert.isUndefined(text);
            assert.isUndefined(author);
            done();
          })
      });
      
    });
    
    suite('PUT /api/issues/5c983624f42ebc6cd2a72415 => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
          .put('/api/issues/5c983624f42ebc6cd2a72415')
          .send({
            project: '5c983624f42ebc6cd2a72415',
            _id: issueId
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            expect(res.body).to.be.empty
            done();
          })
      });
      
      test('One field to update', function(done) {
        chai.request(server)
          .put('/api/issues/5c983624f42ebc6cd2a72415')
          .send({
            project: '5c983624f42ebc6cd2a72415',
            _id: issueId,
            title: 'Chai and Mocha TESTING'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.request._data.title, 'Chai and Mocha TESTING');
            done();
          })
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
          .put('/api/issues/5c983624f42ebc6cd2a72415')
          .send({
            project: '5c983624f42ebc6cd2a72415',
            _id: issueId,
            title: 'Chai and Mocha TESTING',
            status_text: 'In QA'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.request._data.title, 'Chai and Mocha TESTING');
            assert.equal(res.request._data.status_text, 'In QA');
            done();
          })
      });
      
    });
    
    suite('GET /api/issues/5c983624f42ebc6cd2a72415 => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/5c983624f42ebc6cd2a72415')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[1], 'title');
          assert.property(res.body[1], 'text');
          assert.property(res.body[1], 'author');
          assert.property(res.body[1], 'assignee');
          assert.property(res.body[1], 'statusText');
          assert.property(res.body[1], 'createdOn');
          assert.property(res.body[1], 'updatedOn');
          assert.property(res.body[1], 'open');
          assert.property(res.body[1], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/5c983624f42ebc6cd2a72415')
        .query({
          title: 'Chai and Mocha TESTING'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          expect(res.request.qs).to.not.be.empty
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/5c983624f42ebc6cd2a72415')
        .query({
          title: 'Chai and Mocha TESTING',
          author: 'Functional Test - Every field filled in'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          expect(res.request.qs).to.not.be.empty
          done();
        });
      });
      
    });
    
    suite('DELETE /api/issues/5c983624f42ebc6cd2a72415 => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/5c983624f42ebc6cd2a72415')
        .send({
          project: '5c983624f42ebc6cd2a72415',
          _id: ''
        })
        .end((err, res) => {
          assert.equal(res.text, '_id error')
          done();
        })
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
        .delete('/api/issues/5c983624f42ebc6cd2a72415')
        .send({
          project: '5c983624f42ebc6cd2a72415',
          _id: issueId
        })
        .end((err, res) => {
          assert.equal(res.text, 'success: deleted ' + issueId)
          done();
        })
      });
      
    });

});
