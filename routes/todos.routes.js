const express = require("express");
const { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todos.controller");
const router = express.Router();

router.get("/", getAllTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;