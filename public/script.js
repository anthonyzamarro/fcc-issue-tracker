// import * from './jquery-ui.min.js';


$(function() {
    // jquery accordion
    $( "#testui" ).accordion({
      collapsible: true
    });

    var currentProject = window.location.pathname.replace(/\//g, "");
    var url = "/api/issues/"+currentProject;
    var issues = [];
    
    // takes array and returns string
    const formatIssues = (filteredIssues) => {
      // console.log('formatIssues', filteredIssues)
      let fi = filteredIssues.map(filteredIssue => {
        var openstatus;
            (filteredIssue.open) ? openstatus = 'open' : openstatus = 'closed';
            var single = [
              '<div class="issue '+openstatus+'">',
              '<p class="id">id: '+filteredIssue._id+'</p>',
              '<h3>'+filteredIssue.title+' -  ('+openstatus+')</h3>',
              '<br>',
              '<p>'+filteredIssue.text+'</p>',
              '<p>'+filteredIssue.statusText+'</p>',
              '<br>',
              '<p class="id"><b>Created by:</b> '+filteredIssue.author+'  <b>Assigned to:</b> '+filteredIssue.assignee,
              '<p class="id"><b>Created on:</b> '+filteredIssue.createdOn+'  <b>Last updated:</b> '+filteredIssue.updatedOn,
              '<br><a href="#" class="closeIssue" id="'+filteredIssue._id+'">close?</a> <a href="#" class="deleteIssue" id="'+filteredIssue._id+'">delete?</a>',
              '</div>'
            ];
            return single.join('');
      })
      return fi.join('');
    }

     const closeNotification = () => {
      $('#jsonResult').click(function(index, item) {
        $('#jsonResult').html('')
      })
    }
     closeNotification();
    
    // takes string and returns html as string
    const formatNotification = (string) => {
      return '<div class="notification-content">'+string+'<span class="close-notification">X</span></div>'
    }
    

    // GET
    // displays on page load
    $.ajax({
        type: "GET",
        url: url,
        success: function(data)
        {
          data.issues.forEach(function(ele) {
            var openstatus;
            (ele.open) ? openstatus = 'open' : openstatus = 'closed';
            var single = [
              '<div class="issue '+openstatus+'">',
              '<p class="id">id: '+ele._id+'</p>',
              '<h3>'+ele.title+' -  ('+openstatus+')</h3>',
              '<br>',
              '<p>'+ele.text+'</p>',
              '<p>'+ele.statusText+'</p>',
              '<br>',
              '<p class="id"><b>Created by:</b> '+ele.author+'  <b>Assigned to:</b> '+ele.assignee,
              '<p class="id"><b>Created on:</b> '+ele.createdOn+'  <b>Last updated:</b> '+ele.updatedOn,
              '<br><a href="#" class="closeIssue" id="'+ele._id+'">close?</a> <a href="#" class="deleteIssue" id="'+ele._id+'">delete?</a>',
              '</div>'
            ];
            issues.push(single.join(''));
          });
          $('#projectTitle').text('All issues for: '+data.title);
          $('#issueDisplay').html(issues.join(''));
        }
      });
            
    // GET
    // reset display from filters
    $('#filter-clear').click(function(e) {
      e.preventDefault();
      $.ajax({
        url: url,
        type: 'get',
        success: function(data) {
          $('#issueDisplay').html(formatIssues(data.issues));
          $('.filter-input').val('');
          $('#status-select option:selected').removeAttr('selected');
        }
      });
    });
    
    // POST
    // filter issues
    $('#filter-form').submit(function(e) {
      e.preventDefault();
      $.ajax({
        url: url + '/filters',
        type: 'post',
        data: $(this).serialize(),
        success: function(data) {
          if  (data == 'empty filters') {
            $('#jsonResult').html(formatNotification(data));
            setTimeout((e) => {
              $('#jsonResult').html('');
            }, 5000)
            
          } else {
            $('#issueDisplay').html(formatIssues(data.issues));
          }
        }
      });
    });
    
    // POST
    // create new issue and display it
    $('#newIssue').submit(function(e){
      e.preventDefault();
      $(this).attr('action', "/api/issues/" + currentProject);
      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function(data) {
          let formatted = formatIssues([data._doc])
          issues.push(formatted)
          $('#issueDisplay').html(issues);
          $('#newIssue input, textarea').val('');
        },
        error: (data) => {
          const jsonParsed = JSON.parse(data.responseText);
          $('#issueDisplay').html('');
          $('#issueDisplay').prepend('<h1>Status '+data.status+ ' ' + data.statusText+'</h1>')
          for(let i in jsonParsed.errors) {
            $('#issueDisplay').append('<h2>'+jsonParsed.errors[i].message+'</h2>');
          }
        }
      });
    });    
    
    // PUT
    // by entering Id and fields
    $('#testForm2').submit(function(e) {
      e.preventDefault();
      $.ajax({
        url: url,
        type: 'put',
        data: $('#testForm2').serialize(),
        success: function(data) {
          $('#jsonResult').html(formatNotification(JSON.stringify(data)));
          setTimeout((e) => {
              $('#jsonResult').html('');
            }, 5000)
        }
      });
    });
    
    // PUT
    // close issue by button click
    $('#issueDisplay').on('click','.closeIssue', function(e) {
      console.log($(this))
      var $this = $(this);
      $.ajax({
        type: "PUT",
        url: url,
        data: {_id: $(this).attr('id'), open: true},
        success: function(data) { 
          $this.closest('div.issue').addClass('closed').removeClass('open');
        },
        error: function(data) {
          console.log('issue.html PUT error', data);
        }
      });
      e.preventDefault();
    });
    
    // DELETE
    // helper delete function
    const removeIssueFromDom = (target) => {
      issues.forEach(issue => {
        /*
          each issue is a string of DOM nodes, so find the issue that has a matching ID

          make sure it exists and that we are not
          targeting any other strings

          get the indexOf that issue in the issues array

          splice that issue from the array

          update the dom with the new issues array
        */
        let i = issue.indexOf(target)
        if (i != -1) {
          let issuesIndex = issues.indexOf(issue);
          issues.splice(issuesIndex, 1);
          $('#issueDisplay').html(issues.join(''));
        }
      });
    }

    // DELETE
    // By entering ID
    $('#testForm3').submit(function(e) {
      e.preventDefault();
      $.ajax({
        url: url,
        type: 'delete',
        data: $('#testForm3').serialize(),
        success: function(data) {
          if (data !== '_id error') {
            removeIssueFromDom(e.target[0].value);
          }
          $('#jsonResult').html(formatNotification(JSON.stringify(data)));
          setTimeout((e) => {
              $('#jsonResult').html('');
            }, 5000)
        },
        error: function(data) {
          $('#jsonResult').html(formatNotification(JSON.stringify(data.responseText)));
          setTimeout((e) => {
              $('#jsonResult').html('');
            }, 5000)
        }
      });
    });

    // DELETE
    // By button click
    $('#issueDisplay').on('click','.deleteIssue', function(e) {
      var url = "/api/issues/"+currentProject;
      e.preventDefault();

      $.ajax({
        type: "DELETE",
        url: url,
        data: {_id: $(this).attr('id')},
        success: function(data) {
          removeIssueFromDom(e.target.id);
          $('#jsonResult').html(formatNotification(data));
          setTimeout((e) => {
            $('#jsonResult').html('');
          }, 5000)
        }
      });
    });
});