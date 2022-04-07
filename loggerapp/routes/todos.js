var express = require("express");
var router = express.Router();
const todoController = require("../controllers/todos");
router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.delete("/:_id", todoController.deleteTodo);
router.put("/:_id", todoController.editTodo);
module.exports = router;
