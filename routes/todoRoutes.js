const {
  createTodo,
  editTodo,
  deleteTodo,
  getTodo,
  getAllTodos,
} = require("../controllers/todoController");

const router = require("express").Router();

router.post("/create-todo", createTodo);
router.put("/edit-todo/:id", editTodo);
router.delete("/delete-todo/:id", deleteTodo);
router.get("/get-todo/:id", getTodo);
router.get("/get-all-todos", getAllTodos);

module.exports = router;
