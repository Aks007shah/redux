import React, { useContext } from "react";
import { CartContext } from "../Cart/CartContext";

function Cart() {
  const { cartItem } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success">🛒 Your Cart</h2>
      {cartItem.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItem.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
