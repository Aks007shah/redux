const todoModel = require("../models/Todo");

class TodoController {
  getAllTodos = async (req, res) => {
    try {
      const getTodo = await todoModel.find({});

      if (getTodo) {
        res
          .status(200)
          .json({ message: "Todos fetched successfully", data: getTodo });
      } else {
        res.status(404).json({ message: "No todos found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  addTodo = async (req, res) => {
    try {
      const { name } = req.body;

      const todoAdd = new todoModel({
        name
      });

      await todoAdd.save();
      res
        .status(201)
        .json({ message: "Todo added successfully", data: todoAdd });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;

    const delTodo = await todoModel.findByIdAndDelete(id);

    if (delTodo) {
      res.status(200).json({ message: "Todo Item has been Deleted" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

}

const obj = new TodoController();
module.exports = obj;
