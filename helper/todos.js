var db = require("../models");

exports.getTodos = function(req, res){
    db.Todo.find()
   .then(function(todos){
       res.json(todos)
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.createTodos = function(req, res){
    console.log("this is req booooooody " + req.body)
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
    // res.send("this is the post routeeee")
    // console.log("hii")
    // console.log(req.body);
}

exports.getTodo = function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo)
    })
    .catch(function(err){
        res.send(err)
    })
};

exports.updateTodo = function(req, res){
    console.log(req.body);
    db.Todo.findOneAndUpdate({_id:req.params.todoId}, req.body,{new:true})
    .then(function(updatedTodo){
        res.json(updatedTodo);
    })
    .catch(function(err){
        res.send(err)
    })
};

exports.deleteTodo = function(req, res){
    console.log("req.params: " + req.params)
    db.Todo.remove({_id:req.params.todoId})
    .then(function(){
        res.json({message: "deleted now "})
    })
    .catch(function(err){
        res.send(err);
    });
};




module.exports = exports;