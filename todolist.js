function addTask() {
    //don't add anything if input is blank
    if($("#new-task").val() == '')
        return;

    //append new list item in to do list
    $(".tasks-list").append("<li><input type='checkbox'><span>" +
     $("#new-task").val() +
      "</span><div class='buttons'><button class='edit'>edit</button> | <button class='delete'>delete</button></li>");

    //add delete button functionality
    $(".delete").click(function(){
        $(this).closest('li').remove();
    });

    //add edit button functionality
    $(".edit").click(function(){
        var task = $(this).parent().prev();
        task.attr('contenteditable','true');
        task.focus();
    });

    //add enter button functionality when editting
    $("span").keyup(function(event) {
        if (event.keyCode === 13) {
            $(this).attr('contenteditable','false');
        }
    });
    
    //add checkbox functionality
    $("input").click(function() {
        var test = $(this).next();
        if($(this).is(':checked'))
            $(this).next().css('text-decoration','line-through');
        else
            $(this).next().css('text-decoration','none');
    });

    //reset the new task input box
    $("#new-task").val('');

    $("#new-task").focus();
}

//save task when enter button is hit
$("#new-task").keyup(function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        addTask();
    }
});
