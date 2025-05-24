const newProductModel = require("../models/Productsnew");

class newProductClass {
  getAllProducts = async (req, res) => {
    const response = await newProductModel.find({ isDeleted: false });

    if (!response) {
      return res.status(404).json({ message: "No product found" });
    }
    res
      .status(200)
      .json({
        message: "Product Found",
        data: response,
        dataLength: response.length,
      });
  };

  async addProducts(req, res) {
    const { name, description, price } = req.body;
    try {
      const checkProName = await newProductModel.findOne({
        name,
      });

      if (checkProName) {
        return res
          .status(500)
          .json({ message: "Product Name is Already Added" });
      } else {
        const addProduct = new newProductModel({
          name,
          description,
          price,
        });
        await addProduct.save();

        res.status(201).json({ message: "New Product Has been Added" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async editProduct(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedProduct = await newProductModel.findById(id);

    if (!updatedProduct) {
      res.status(400).json({ message: "Error Updating Product" });
    } else {
      if (name) updatedProduct.name = name;
      if (name) updatedProduct.description = description;
      if (name) updatedProduct.price = price;

      await updatedProduct.save();
      res.status(200).json({ message: "Product Successfully Updated" });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;

    const checkProduct = await newProductModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    if (!checkProduct) {
      res.status(404).json({ message: "Error Deleting Product" });
    } else {
      res.status(200).json({ message: "Product Deleted Successfully" });
    }
  }
}

const obj = new newProductClass();
module.exports = obj;
