const productsModel = require("../models/Products");

class ProductController {
  async getAllProducts(req, res) {
    try {
      const data = await productsModel.find();

      if (data.length === 0) {
        return res.status(404).json({ message: "No products found" });
      } else {
        return res.status(200).json({ message: "Products found", data });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async addProducts(req, res) {
    const { name, price, description } = req.body;

    const checkProductName = await productsModel.findOne({ name });

    if (checkProductName) {
      return res
        .status(400)
        .json({ message: "Same Product Name Existed, Try new" });
    }

    const data = new productsModel({
      name,
      price,
      description,
    });

    await data.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: data });
  }

  async getProductId(req, res) {
    const { id } = req.params;

    try {
      const checkProduct = await productsModel.findById(id);

      if (checkProduct) {
        return res
          .status(200)
          .json({ message: `Product ID Found ${id}`, product: checkProduct });
      } else {
        return res.status(404).json({ message: "No Product Found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }

  async updateProducts(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const Products = await productsModel.findById(id);

    if (Products) {
      if (name) Products.name = name;
      if (description) Products.description = description;
      if (price) Products.price = price;

      const updatedProduct = await Products.save();

      res
        .status(200)
        .json({ message: "Updated Successfully", data: updatedProduct });
    } else {
      return res.status(400).json({
        message: "Error occured while Updating",
        data: updatedProduct,
      });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;

    const products = await productsModel.findByIdAndDelete(id);

    if (products) {
      res.status(200).json({ message: "Product successfully Deleted" });
    } else {
      res.status(400).json({ message: "Error Deleting Product" });
    }
  }

  async showLimitedProducts(req, res) {
    try {
      const expensiveProducts = await productsModel.find({
        price: { $gt: 300 },
      });
      if (expensiveProducts.length === 0) {
        return res.status(404).json({ message: "No products above price 300" });
      }
      res
        .status(200)
        .json({
          message: "Products found",
          data: expensiveProducts,
          length: expensiveProducts.length,
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async showProductsWithConditions(req, res){
        const checkProducts = await productsModel.find({
          $or: [
            {price: {$lt: 100}},
            {price: {$gt: 600}},
          ]
        })

        if (checkProducts.length === 0) {
          res.status(404).json({message: "No Products Found"})
        } else {
          res.status(200).json({message: "Products Found", data: checkProducts, length: checkProducts.length})
        }
  }
}

const obj = new ProductController();
module.exports = obj;
