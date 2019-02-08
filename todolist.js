function addTask() {
    //don't add anything if input is blank
    if($("#new-task").val() == '')
        return;
    var test = $("#priority").val();
    var entry;
    //append new list item in to do list
    if($(".priority").val() == "low"){ //if priority is low, medium, high
        entry = "<li><input type='checkbox'><span>" +
         $("#new-task").val() +
          "</span><select type='select' class='task-priority-saved' disabled>" + 
           "<option value='low' selected>Low</option>" + 
            "<option value='medium'>Medium</option>" +
             "<option value='high'>High</option></select>" +
              "<div class='buttons'><button class='edit'>edit</button> | <button class='delete'>delete</button></li>";
        append(entry, "low");
    } else if($(".priority").val() == "medium"){
        entry = "<li><input type='checkbox'><span>" +
         $("#new-task").val() +
          "</span><select type='select' class='task-priority-saved' disabled>" + 
           "<option value='low'>Low</option>" + 
            "<option value='medium' selected>Medium</option>" +
             "<option value='high'>High</option></select>" +
              "<div class='buttons'><button class='edit'>edit</button> | <button class='delete'>delete</button></li>";
        append(entry, "medium");
    } else if($(".priority").val() == "high"){
        entry = "<li><input type='checkbox'><span>" +
         $("#new-task").val() +
          "</span><select type='select' class='task-priority-saved' disabled>" + 
           "<option value='low'>Low</option>" + 
            "<option value='medium'>Medium</option>" +
             "<option value='high' selected>High</option></select>" +
              "<div class='buttons'><button class='edit'>edit</button> | <button class='delete'>delete</button></li>";
        append(entry, "high");
    }

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

$(".clear-button").click(function(){
    $(".strike").parent().remove();
});

function append(task, priority){
    if(priority == "low"){
        $(".tasks-list-low").append(task);
    } else if(priority == "medium"){
        $(".tasks-list-medium").append(task);
    } else if(priority == "high"){
        $(".tasks-list-high").append(task);
    }

    //add delete button functionality
    $(".delete").click(function(){
        $(this).closest('li').remove();
    });

    //add edit button functionality
    $(".edit").click(function(event) {
        event.stopImmediatePropagation(); //fixes bug where click event was being fired more than once
        var task = $(this).parent().prev().prev();
        var priority = $(this).parent().prev();
        if($(this).html() == 'edit'){
            $(this).html('save');
            task.attr('contenteditable','true');
            task.focus();
            priority.prop('disabled', false);
            priority.addClass("task-priority-unsaved");
            priority.removeClass("task-priority-saved");
        } else {
            $(this).html('edit');
            task.attr('contenteditable','false');
            task.focus();
            priority.prop('disabled', true);
            priority.removeClass("task-priority-unsaved");
            priority.addClass("task-priority-saved");
            var test = task.parent().parent().attr("class");
            var test2 =priority.val();
            var listEntry = task.parent();
            if(priority.val() == 'low' && task.parent().parent().attr("class") != 'tasks-list-low'){
                task.parent().remove();
                append(listEntry, "low");
            } else if(priority.val() == 'medium' && task.parent().parent().attr("class") != 'tasks-list-medium'){
                task.parent().remove();
                append(listEntry, "medium");
            } else if(priority.val() == 'high' && task.parent().parent().attr("class") != 'tasks-list-high'){
                task.parent().remove();
                append(listEntry, "high");
            }
        }
    });

    //add enter button functionality when editting
    $("span").keyup(function(event) {
        if (event.keyCode === 13) {
            $(this).next().next().children(":first").html('edit');
            var task = $(this);
            var priority = $(this).next();
            task.attr('contenteditable','false');
            task.focus();
            priority.prop('disabled', true);
            priority.removeClass("task-priority-unsaved");
            priority.addClass("task-priority-saved");
            var test = task.parent().parent().attr("class");
            var test2 =priority.val();
            var listEntry = task.parent();
            if(priority.val() == 'low' && task.parent().parent().attr("class") != 'tasks-list-low'){
                task.parent().remove();
                append(listEntry, "low");
            } else if(priority.val() == 'medium' && task.parent().parent().attr("class") != 'tasks-list-medium'){
                task.parent().remove();
                append(listEntry, "medium");
            } else if(priority.val() == 'high' && task.parent().parent().attr("class") != 'tasks-list-high'){
                task.parent().remove();
                append(listEntry, "high");
            }
        }
    });

    //add checkbox functionality
    $("input").click(function() {
        var test = $(this).next();
        if($(this).is(':checked'))
            $(this).next().addClass('strike');
        else
            $(this).next().removeClass('strike');
    });
}