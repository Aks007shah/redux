import React, { useState, useEffect } from "react";

function TodoApi() {
  const [inpVal, setInpVal] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [msg, setMsg] = useState("");

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:3100/todo");
      const data = await res.json();

      if (data.data) {
        setTodoList(data.data); // store full todo objects { _id, name }
      }
    };
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    setInpVal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inpVal.trim()) {
      setMsg("Please enter a todo");
      return;
    }

    const response = await fetch("http://localhost:3100/todo/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: inpVal }),
    });

    const result = await response.json();

    if (response.ok) {
      setMsg(result.message);
      setTodoList((prev) => [...prev, result.data]); // store full object
      setInpVal("");
    } else {
      setMsg(result.message || "Failed to add todo");
    }
  };

  const onHandleDelete = async (id) => {
    const response = await fetch("http://localhost:3100/todo/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();

    if (response.ok) {
      setMsg(result.message);
      setTodoList((prev) => prev.filter((todo) => todo._id !== id));
    } else {
      setMsg(result.message || "Failed to delete todo");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Todo App</h2>

          {/* Input Form */}
          <form className="d-flex mb-4" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="text"
              onChange={handleChange}
              placeholder="Enter todo"
              value={inpVal}
            />
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </form>

          {/* Todo List Display */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Todo List</h5>
              <ul className="list-group">
                {todoList.map((todo) => (
                  <li
                    key={todo._id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {todo.name}
                    <button
                      onClick={() => onHandleDelete(todo._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional Message Display */}
          {msg && <p className="mt-3 text-info">{msg}</p>}
        </div>
      </div>
    </div>
  );
}

export default TodoApi;
