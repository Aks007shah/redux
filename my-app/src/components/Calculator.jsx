import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const onHandleAdd = (val) => {
    setInput(input + val);
  };

  const onHandleMinus = () => {
    setInput(input + "-");
  };

  const onHandleMultiply = () => {
    setInput(input + "*");
  };

  const onHandleDivision = () => {
    setInput(input + "/");
  };

  const onHandleClear = () => {
    setInput("");
  };

  const onHandleEqual = () => {
    try {
      // eslint-disable-next-line
      setInput(eval(input));
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Simple Calculator</h2>
      <input
        type="text"
        value={input}
        className="form-control mb-3 text-end"
        disabled
      />

      <div className="row g-2">
        {/* Numbers */}
        {[1, 2, 3].map((num) => (
          <div className="col-3" key={num}>
            <button className="btn btn-primary w-100" onClick={() => onHandleAdd(num.toString())}>
              {num}
            </button>
          </div>
        ))}
        <div className="col-3">
          <button className="btn btn-primary w-100" onClick={() => onHandleAdd("+")}>
            +
          </button>
        </div>

        {[4, 5, 6].map((num) => (
          <div className="col-3" key={num}>
            <button className="btn btn-primary w-100" onClick={() => onHandleAdd(num.toString())}>
              {num}
            </button>
          </div>
        ))}
        <div className="col-3">
          <button className="btn btn-primary w-100" onClick={onHandleMinus}>
            -
          </button>
        </div>

        {[7, 8, 9].map((num) => (
          <div className="col-3" key={num}>
            <button className="btn btn-primary w-100" onClick={() => onHandleAdd(num.toString())}>
              {num}
            </button>
          </div>
        ))}
        <div className="col-3">
          <button className="btn btn-primary w-100" onClick={onHandleMultiply}>
            *
          </button>
        </div>

        <div className="col-3">
          <button className="btn btn-primary w-100" onClick={() => onHandleAdd("0")}>
            0
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-primary w-100" onClick={onHandleDivision}>
            /
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-success w-100" onClick={onHandleEqual}>
            =
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-warning w-100" onClick={onHandleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
