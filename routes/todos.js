var express = require("express");
var router = express.Router();
var db = require("../models")
var helper = require("../helper/todos")

// router.get("/", );
// router.post("/", )
// the above 2 routes could be combined to:

router.route("/")
    .get(helper.getTodos)
    .post(helper.createTodos)

// router.get("/:todoId", )
// router.put("/:todoId", )
// router.delete(":/todoId", )
router.route("/:todoId")
    .get(helper.getTodo)
    .put(helper.updateTodo)
    .delete(helper.deleteTodo)



module.exports = router;