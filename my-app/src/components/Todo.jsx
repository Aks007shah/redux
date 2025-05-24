import React, { useEffect, useState } from "react";

function Todo() {
  const [inpVal, setInpVal] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todoHere");
    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos));
    }
  }, []);

  const onHandleChange = (e) => {
    setInpVal(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (inpVal.trim() === "") {
      alert("Please enter a todo item.");
      return;
    }
    setTodoList([...todoList, inpVal]);
    setInpVal("");
    localStorage.setItem("todoHere", JSON.stringify([...todoList, inpVal]));
  };

  const onHandleDelete = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    // setTodoList(updatedList);

    localStorage.setItem("todoHere", JSON.stringify(updatedList));
    setTodoList(updatedList);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={onHandleSubmit} className="d-flex gap-2 mb-3">
            <input
              type="text"
              className="form-control"
              value={inpVal}
              onChange={onHandleChange}
              placeholder="Enter a todo item"
            />
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </form>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Todo List</h5>
              <ul className="list-group">
                {todoList.length === 0 ? (
                  <li className="list-group-item text-muted">
                    No items added yet.
                  </li>
                ) : (
                  todoList.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item}
                      <button
                        onClick={() => onHandleDelete(index)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
