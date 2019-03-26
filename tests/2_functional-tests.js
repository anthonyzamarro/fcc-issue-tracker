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
var expect = chai.expect
var server = require('../server');

chai.use(chaiHttp);

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
            // console.log('required fields', res.body);
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
            // console.log('missing fields', title, text, author)
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
            _id: '5c9836e7f42ebc6cd2a72418'
          })
          .end((err, res) => {
            assert.equal(res.status, 200);
            // console.log('PUT response!!!!', res.body)
            expect(res.body).to.be.empty
            done();
          })
      });
      
      test('One field to update', function(done) {
        chai.request(server)
          .put('/api/issues/5c983624f42ebc6cd2a72415')
          .send({
            project: '5c983624f42ebc6cd2a72415',
            _id: '5c9836e7f42ebc6cd2a72418',
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
            _id: '5c9836e7f42ebc6cd2a72418',
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
          // console.log(err, res.body[0].title)
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          // assert.property(res.body[0], 'issue_text');
          // assert.property(res.body[0], 'created_on');
          // assert.property(res.body[0], 'updated_on');
          // assert.property(res.body[0], 'created_by');
          // assert.property(res.body[0], 'assigned_to');
          // assert.property(res.body[0], 'open');
          // assert.property(res.body[0], 'status_text');
          // assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        
      });
      
    });
    
    suite('DELETE /api/issues/5c983624f42ebc6cd2a72415 => text', function() {
      
      test('No _id', function(done) {
        
      });
      
      test('Valid _id', function(done) {
        
      });
      
    });

});
