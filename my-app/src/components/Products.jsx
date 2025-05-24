import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [selectProducts, setSelectProducts] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3100/newproduct/get", {
      method: "GET",
    });

    const data = await response.json();

    console.log(data);
    // console.log(data)

    if (response.ok) {
      setProducts(data.data);
      setMsg(data.data.message || "Product Fetched");

      setTimeout(() => {
        setMsg("");
      }, 1500);
    } else {
      setMsg(data.data.error.message || "Products Not Fetched");
    }
  };

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setSelectProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:3100/newproduct/${editId}`
      : "http://localhost:3100/newproduct/add";

    const method = editId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectProducts),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg(data.message);
        setSelectProducts({
          name: "",
          description: "",
          price: "",
        });

        setEditId(null);
        await getProducts();
      }
    } catch (error) {
      setMsg(error.message);
    }
  };

  const onEdit = (item) => {
    setEditId(item._id);

    setSelectProducts({
      name: item.name,
      description: item.description,
      price: item.price,
    });
  };

  const onDeleteProduct = async (item) => {
    const response = await fetch(
      `http://localhost:3100/newproduct/${item._id}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (response.ok) {
      setMsg(data.message);

      await getProducts();
    }
  };

  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const onHandleCart = (item) => {
  //   addToCart(item);
  //   navigate("/cart");
  // };

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                action=""
                onSubmit={onHandleSubmit}
                className="form-control"
              >
                <input
                  onChange={onHandleChange}
                  value={selectProducts.name}
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name..."
                />
                <input
                  onChange={onHandleChange}
                  name="description"
                  placeholder="Description..."
                  value={selectProducts.description}
                  className="form-control"
                  type="text"
                />
                <input
                  onChange={onHandleChange}
                  placeholder="Price..."
                  name="price"
                  value={selectProducts.price}
                  className="form-control"
                  type="number"
                />
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container justify-content-center align-items-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6 justify-content-center align-items-center">
            <form
              onSubmit={onHandleSubmit}
              action=""
              className="tabl form-control mt-5 shadow shadow-lg"
            >
              <h3 className="text-center text-danger">Enter Products</h3>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                name="name"
                value={selectProducts.name}
                onChange={onHandleChange}
                id=""
              />
              <input
                type="text"
                placeholder="Enter Description"
                className="form-control"
                value={selectProducts.description}
                name="description"
                onChange={onHandleChange}
                id=""
              />
              <input
                type="number"
                placeholder="Enter Price"
                className="form-control"
                name="price"
                value={selectProducts.price}
                onChange={onHandleChange}
                id=""
              />
              <button type="submit" className="btn btn-success m-3">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* //search Bar */}
      <div className="container border border-2 p-4 m-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-5 justify-content-center align-items-center">
            <input
              className="form-control"
              type="text"
              placeholder="Search for Product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container p-4 m-3">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-12 justify-content-center align-items-center">
            <h5 className="text-secondary">{msg}</h5>
            <table className="table table-primary justify-content-center tabl align-items-center mt-5 border border-2">
              <tr className="p-3 tabl table-light">
                <th scope="col">Name</th>
                <th>Description</th>
                <th scope="col">Price</th>
                <th scope="col">Edit Product</th>
                <th scope="col">Delete Product</th>
                <th scope="col">Add To Cart</th>
              </tr>
              <tbody>
                {filteredProducts.map((item, index) => (
                  <tr key={item._id}>
                    <td scope="row">{item.name}</td>
                    <td scope="row">{item.description}</td>
                    <td scope="row">{item.price}</td>
                    <td>
                      <button
                        onClick={() => onEdit(item)}
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="submit"
                        onClick={() => onDeleteProduct(item)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button onClick={() => addToCart(item)}>
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
