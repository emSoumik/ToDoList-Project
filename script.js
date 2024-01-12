$(document).ready(function(){
    // Load tasks from localStorage
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
        var task = $('#taskInput').val();
        if(task.trim() == '') {
            alert('Please enter a task.');
            return false;
        }
        $('#taskList').append("<li class='list-group-item d-flex justify-content-between align-items-center'>" + task + "<button type='button' class='btn btn-danger'>Delete</button></li>");
        $('#taskInput').val("");

        // Save tasks to localStorage
        localStorage.setItem('tasks', $('#taskList').html());
    });

    $(document).on('click', '.btn-danger', function(){
        $(this).closest('li').remove();

        // Save tasks to localStorage
        localStorage.setItem('tasks', $('#taskList').html());
    });
});
