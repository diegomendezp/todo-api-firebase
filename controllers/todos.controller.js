const Todo = require("../models/Todo.model");


module.exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch(err){
    return res.status(500).json(err);
  }
}

module.exports.getTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOne({ _id: id });
    return res.status(200).json(todo);
  } catch(err){
    return res.status(500).json(err);
  }
}

module.exports.createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(200).json(todo);
  } catch(err) {
    return res.status(500).json(err);
  }
}

module.exports.updateTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndUpdate({ _id: id }, req.body, { new: true });
    return res.status(200).json(todo);
  } catch(err) {
    return res.status(500).json(err);
  }
}

module.exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Todo.findOneAndRemove({ _id: id});
    return res.status(200).json({ message: `Todo ${id} removed 🗑`});
  } catch (err) {
    return res.status(500).json(err);
  }
}