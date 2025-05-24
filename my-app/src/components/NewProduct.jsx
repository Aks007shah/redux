import React, { useEffect, useState } from "react";

function NewProduct() {
  const [product, setProduct] = useState([]); //save product
  const [selectProducts, setSelectProducts] = useState({
    name: "",
    description: "",
    price: "",
  }); //send new product
  const [editId, setEditId] = useState(null); //save id
  const [msg, setMsg] = useState(""); //set message after operation
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3100/newproduct/get");
      const data = await response.json();
      if (data) {
        setProduct(data.data || []);
        setMsg(data.message || "Products loaded");
      } else {
        setProduct([]);
        setMsg("No products found");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMsg("Error fetching products");
    }
  };

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setSelectProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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

      const result = await response.json();
      if (response.ok) {
        setMsg(
          editId ? "Product updated successfully" : "Product added successfully"
        );
        setSelectProducts({ name: "", description: "", price: "" });
        setEditId(null);
        getProducts();
      } else {
        setMsg(result.message || "Operation failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMsg("Error during operation");
    }
  };

  const handleEditClick = (item) => {
    setEditId(item._id);

    setSelectProducts({
      name: item.name,
      description: item.description,
      price: item.price,
    });
  };

  
    const filteredProducts = product.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mt-1">
              <form className="form-control" onSubmit={handleSubmit}>
                <input
                  className="form-control my-2"
                  type="text"
                  name="name"
                  value={selectProducts.name}
                  onChange={onHandleChange}
                  placeholder="Enter Name"
                />
                <input
                  className="form-control my-2"
                  type="text"
                  name="description"
                  value={selectProducts.description}
                  onChange={onHandleChange}
                  placeholder="Enter Description"
                />
                <input
                  className="form-control my-2"
                  type="number"
                  name="price"
                  value={selectProducts.price}
                  onChange={onHandleChange}
                  placeholder="Enter Price"
                />
                <div>
                  <div>{msg}</div>
                  <button type="submit" className="btn btn-success mt-1">
                    Save Product
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Section */}
      <div className="container-fluid mt-5">
        <div className="row mt-5 justify-content-center align-items-center">
          <div className="col-sm-9 mt-5">
            <form
              className="form-control shadow shadow-lg"
              onSubmit={handleSubmit}
            >
              <h2 className="text-danger text-center">Add Products Here</h2>
              <input
                className="form-control my-2"
                type="text"
                name="name"
                value={selectProducts.name}
                onChange={onHandleChange}
                placeholder="Name..."
                required
              />
              <input
                className="form-control my-2"
                type="text"
                name="description"
                value={selectProducts.description}
                onChange={onHandleChange}
                placeholder="Description..."
                required
              />
              <input
                className="form-control my-2"
                type="number"
                name="price"
                value={selectProducts.price}
                onChange={onHandleChange}
                placeholder="Price..."
                required
              />
              <button type="submit" className="btn btn-primary m-3">
                {editId ? "Update Product" : "Add Now"}
              </button>
              <p className="text-success">{msg}</p>
            </form>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5 justify-content-center align-items-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-5 justify-content-center align-items-center">
            <div className="mb-3 text-end">
              <input
                type="text"
                placeholder="Search by product name"
                className="form-control"
                style={{ maxWidth: "300px", display: "inline-block" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-10">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price (₹)</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {product.length > 0 ? (
                  filteredProducts.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price} ₹</td>
                      <td>
                        <button
                          onClick={() => handleEditClick(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Products Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
