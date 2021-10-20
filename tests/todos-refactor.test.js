const supertest = require('supertest');
const { server } = require('../server');
const mongoose = require('mongoose');
const Todo = require('../models/Todo.model');
const { todos, sum, api, getAllTodos } = require('./helpers');


beforeEach(async () => {
  await Todo.collection.drop();
  await Todo.insertMany(todos);
})

test('Sum function', () => {
  expect(sum(2, 2)).toBe(4);
})

test('Sum function fail', () => {
  expect(sum(2, 2)).not.toBe(5);
})


test("Todos are returned as JSON", async () => {
  await api.get("/api/todos").expect(200).expect('Content-Type', /application\/json/);
})

test("There are todos", async () => {
  const { res } = await getAllTodos();
  expect(res.body).toHaveLength(todos.length);
})

test('Insert todo', async () => {
  const newTodo = {
    name: "Not delete Production database",
    priority: true
  }

  await api.post("/api/todos").send(newTodo).expect(200);
  const { res } = await getAllTodos();
  expect(res.body).toHaveLength(todos.length + 1);
})

test('Insert todo fails with incorrect data', async () => {
  const newTodo = {
    priority: true,
    description: "Test"
  }

  await api.post("/api/todos").send(newTodo).expect(500);
  const { res } = await getAllTodos();
  expect(res.body).toHaveLength(todos.length);
})

test('Delete todo', async () => {
  const { res } = await getAllTodos();
  const todoToDelete = res.body[0];

  await api.delete(`/api/todos/${todoToDelete.id}`).expect(200);
  let { res:response, names } = await getAllTodos();
  expect(response.body).toHaveLength(todos.length - 1);

  expect(names).not.toContain(todoToDelete.name);
})

test('Edit todo', async () => {
  const { res } = await getAllTodos();
  const todoToEdit = res.body[0];

  await api.put(`/api/todos/${todoToEdit.id}`).send({ name: "Todo editado"}).expect(200)
  let { names } =  await getAllTodos();

  expect(names).toContain("Todo editado");
})

afterAll(async () => {
  await mongoose.connection.close()
  server.close();
})