/* global $ */

$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    
    $("#newTodo").keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });
    
    $(".list").on("click", "li", function(){
        updateTodo($(this))
    })
    $(".list").on("click", "span", function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    })
});

function addTodos(todos){
    //add todos to page
    console.log("this isssss the todoss" + todos)
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $("<li class = 'task'>" + todo.name + "<span>X</span></li>");
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed)
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
    
}

function createTodo(){
    //send post request to create new Todo;
    var usrInput = $("#newTodo").val()
    $.post("/api/todos", {name: usrInput})
    .then(function(newTodo){
        $("#newTodo").val("")
        addTodo(newTodo)
    .catch(function(err){
        console.log(err);
    })
    })
}
function removeTodo(todo){
    var clickedId = $(todo).data('id');
        var deleteURL = "/api/todos/" + clickedId;
        console.log(deleteURL);
        $.ajax({
            method:'DELETE',
            url:deleteURL
        })
        .then(function(data){
            todo.remove();
        })
        .catch(function(err){
            console.log(err)
        })
}
function updateTodo(todo){
    console.log("to update " + todo.data("completed"))
    var updateUrl = "api/todos/" + todo.data("id");
    var isDone = !todo.data("completed");
    var updateDone = {completed: isDone}
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data:updateDone
    })
    .then(function(updatedTodo){
        console.log(updatedTodo)
        todo.toggleClass("done")
        todo.data("completed", isDone);
    })
}