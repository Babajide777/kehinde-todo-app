const {
  saveTodo,
  getTodoUsingId,
  updateTodoUsingId,
  deleteTodoUsingId,
  getAllTheTodos,
} = require("../services/todoService");
const { responseHandler } = require("../utils/responseHandler");
const { validateTodo, validateId } = require("../utils/validation");

const createTodo = async (req, res) => {
  try {
    const { details } = await validateTodo(req.body);
    if (details) {
      let allErrors = details.map((detail) => detail.message.replace(/"/g, ""));
      return responseHandler(res, allErrors, 400, false, "");
    }

    let savedTodo = await saveTodo(req.body);

    return savedTodo[0]
      ? responseHandler(res, "Todo saved successfully", 201, true, savedTodo[1])
      : responseHandler(res, savedTodo[1], 400, false, "");
  } catch (error) {
    return responseHandler(res, error.message, 400, false, "");
  }
};

const editTodo = async (req, res) => {
  try {
    const { details: idErr } = await validateId(req.params);
    if (idErr) {
      let allErrors = idErr.map((detail) => detail.message.replace(/"/g, ""));
      return responseHandler(res, allErrors, 400, false, "");
    }

    const { details } = await validateTodo(req.body);
    if (details) {
      let allErrors = details.map((detail) => detail.message.replace(/"/g, ""));
      return responseHandler(res, allErrors, 400, false, "");
    }

    const { id } = req.params;

    const checkId = await getTodoUsingId(id);

    if (!checkId)
      return responseHandler(res, "Todo not available", 400, false, "");

    const check = await updateTodoUsingId(id, req.body);

    return check
      ? responseHandler(res, "Todo edited successfully", 200, true, check)
      : responseHandler(res, "Error editing Todo", 400, false, "");
  } catch (error) {
    return responseHandler(res, error.message, 400, false, "");
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { details: idErr } = await validateId(req.params);
    if (idErr) {
      let allErrors = idErr.map((detail) => detail.message.replace(/"/g, ""));
      return responseHandler(res, allErrors, 400, false, "");
    }

    const { id } = req.params;

    const checkId = await getTodoUsingId(id);

    if (!checkId)
      return responseHandler(res, "Todo not available", 400, false, "");

    const check = await deleteTodoUsingId(id);

    return check
      ? responseHandler(res, "Todo deleted successfully", 200, true, "")
      : responseHandler(res, "Error deleting Todo", 400, false, "");
  } catch (error) {
    return responseHandler(res, error.message, 400, false, "");
  }
};

const getTodo = async (req, res) => {
  try {
    const { details: idErr } = await validateId(req.params);
    if (idErr) {
      let allErrors = idErr.map((detail) => detail.message.replace(/"/g, ""));
      return responseHandler(res, allErrors, 400, false, "");
    }

    const { id } = req.params;

    const checkId = await getTodoUsingId(id);

    return checkId
      ? responseHandler(res, "Todo retrieved successfully", 200, true, checkId)
      : responseHandler(res, "Error getting Todo", 400, false, "");
  } catch (error) {
    return responseHandler(res, error.message, 400, false, "");
  }
};

const getAllTodos = async (req, res) => {
  try {
    return responseHandler(
      res,
      "All Todos retrieved successfully",
      200,
      true,
      await getAllTheTodos()
    );
  } catch (error) {
    return responseHandler(res, error.message, 400, false, "");
  }
};

module.exports = {
  createTodo,
  editTodo,
  deleteTodo,
  getTodo,
  getAllTodos,
};
