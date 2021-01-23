const ProductModel = require("./product.model");

const retrieveProducts = async (limit = 100, skip = 0) => {
  try {
    let products = await ProductModel.find().skip(skip).limit(limit);
    return products;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  retrieveProducts,
};
