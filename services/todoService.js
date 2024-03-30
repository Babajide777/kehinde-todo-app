const Todo = require("../models/todoModel");

const saveTodo = async (body) => {
  try {
    const theTodo = new Todo(body);

    return (await theTodo.save())
      ? [true, theTodo]
      : [false, "Error saving todo"];
  } catch (error) {
    [false, error];
  }
};

const getTodoUsingId = async (id) => await Todo.findById(id);

const updateTodoUsingId = async (id, body) =>
  await Todo.findByIdAndUpdate(id, body, { new: true });

const deleteTodoUsingId = async (id) => await Todo.findByIdAndDelete(id);

const getAllTheTodos = async () => await Todo.find();

module.exports = {
  saveTodo,
  getTodoUsingId,
  updateTodoUsingId,
  deleteTodoUsingId,
  getAllTheTodos,
};
