function addTask() {
    //don't add anything if input is blank
    if($.trim($("#new-task").val()) == '')
        return;
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

//function to append new task to appropriate list
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
        $(this).closest('li').remove(); //get li element and remove it
    });

    //add edit/save button functionality
    $(".edit").click(function(event) {
        event.stopImmediatePropagation(); //fixes bug where click event was being fired more than once
        var task = $(this).parent().prev().prev(); //get task span
        var priority = $(this).parent().prev(); //get priority select box
        if($(this).html() == 'edit'){ //hit edit button
            $(this).html('save'); //change edit button to save
            task.attr('contenteditable','true'); //make task edittable
            task.focus(); //focus on task
            priority.prop('disabled', false);  //make priority edittable
            priority.addClass("task-priority-unsaved"); //change priority class from saved to unsaved
            priority.removeClass("task-priority-saved");
        } else { //hit save button
            if($.trim(task.val()) == ''){ //if task is now blank, remove it
                task.closest('li').remove(); //get li element and remove it
                return;
            }
            $(this).html('edit'); //change edit back to save
            task.attr('contenteditable','false'); //make content not edittable
            priority.prop('disabled', true); //make priority not edittable
            priority.removeClass("task-priority-unsaved"); //change class from unsaved to saved
            priority.addClass("task-priority-saved");
            var listEntry = task.parent(); //get the entire li element in case it changed priority
            if(priority.val() == 'low' && task.parent().parent().attr("class") != 'tasks-list-low'){
                task.parent().remove(); // remove from current priority list
                append(listEntry, "low"); // add it to corrent list
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
            $(this).next().next().children(":first").html('edit'); //change save button to edit
            var task = $(this); //get task element 
            if($.trim(task.val()) == ''){ //if task is now blank, remove it
                task.closest('li').remove(); //get li element and remove it
                return;
            }
            var priority = $(this).next(); //get priority element
            task.attr('contenteditable','false'); //make task not edittable
            priority.prop('disabled', true); //make priority not edittable
            priority.removeClass("task-priority-unsaved"); //change class from unsave to saved
            priority.addClass("task-priority-saved");
            var listEntry = task.parent(); //get li element in case it changed priority
            if(priority.val() == 'low' && task.parent().parent().attr("class") != 'tasks-list-low'){
                task.parent().remove(); //remove from current list
                append(listEntry, "low"); //add to correct list
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
        if($(this).is(':checked'))
            $(this).next().addClass('strike'); //when task is checked add the strike css animation
        else
            $(this).next().removeClass('strike'); //remove strike if unchecked
    });
}

//clear completed tasks button functionality
$(".clear-button").click(function(){
    $(".strike").parent().remove();
});