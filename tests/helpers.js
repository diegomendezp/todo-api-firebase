const supertest = require("supertest");
const { app } = require("../server");
const api = supertest(app);

const todos = [
  {
    name: "Install Jest",
    priority: true
  },
  {
    name: "Learn testing",
    priority: true
  },
]

const sum = (num1, num2) => num1 + num2;

const getAllTodos = async () => {
  const res = await api.get("/api/todos");
  const names = res.body.map(todo => todo.name);
  return { res, names };
};

module.exports = { todos, sum, api, getAllTodos };