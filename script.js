$(document).ready(function(){
// Load tasks from  localStorage
  if(localStorage.getItem('tasks')) {
      $('#taskList').html(localStorage.getItem('tasks'));
  }
  $('#taskInput').keypress(function(e){
      if(e.which == 13) {
          $('#addTaskButton').click();
          return false;    // Prevent form submission
      }
  });
  
  $('#addTaskButton').click(function(){
      var task = $('#taskInput'). val();
      if(task.trim() == '') {
          alert('Please enter a task.');
          return false;
      }
      $('#taskList').append("<li class='list-group-item d-flex justify-content-between align-items-center'>" + task + "<div><button type='button' class='btn btn-success mark-complete'><i class='fas fa-check'></i></button> <button type='button' class='btn btn-danger delete-task'><i class='fas fa-trash'></i></button></div></li>");
       $('#task Input').val("");
      // Save tasks to localStorage
      localStorage.setItem('tasks', $('#taskList').html());
  });
  
  $(document).on('click', '.delete-task', function(){
      $(this).closest('li').remove();
        
      // Save tasks to localStorage
      localStorage.setItem('tasks', $('#taskList').html());
  });
  
  $(document).on ('click', '.mark-complete', function(){
      $(this).closest('li').toggleClass('completed-task');
  
      // Save tasks to localStorage
      localStorage.setItem('tasks', $('#taskList').html());
  });
  
  // Check if the user has a preferred color mode stored in localStorage
  if (localStorage.getItem('color-mode')) {
    // If so, apply the preferred color mode
    $('body').addClass(localStorage.getItem('color-mode'));
  }
  $('#toggleDarkMode').click(function() {
      $('body').toggleClass('dark-mode');
      // Save the preferred color mode to localStorage
      localStorage.setItem('color-mode', $('body').hasClass('dark-mode') ? 'dark-mode' : 'light-mode');
  });
        
   Sortable.create(taskList, {
      animation: 150,
      ghostClass: 'ghost',
      onEnd: function(evt) {
        // Save tasks to localStorage in the new order
        localStorage.setItem('tasks', $('#taskList').html());
      }
    });
  
    $('#taskDueDate').datepicker({
      format: 'yyyy-mm-dd',
      todayBtn: 'linked',
      todayHighlight : true,
      autoclose: true
    });
  
    $('#taskNotes').on('input', function() {
      var notes = $(this).val();
      $(this).closest('li').find('.task-notes').html(notes);
        
      // Save tasks to localStorage
      localStorage.setItem('tasks', $('#taskList').html());
    });
  
    //Share button
    $('#shareTaskButton').click(function() {
      var task = $(this).closest('li').find('.task-text').text();
      var link = window.location.href + '?task=' + encodeURIComponent(task);
  
      $('#shareTaskModal').modal('show');
      $('#shareTaskLink').val(link);
    });
});
