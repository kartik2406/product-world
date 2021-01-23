const ProductModel = require("./product.model");
const escapeStringRegexp = require("escape-string-regexp");

const retrieveProducts = async (limit = 100, skip = 0) => {
  try {
    let products = await ProductModel.find().skip(skip).limit(limit);
    return products;
  } catch (e) {
    throw new Error(e.message);
  }
};

const searchProducts = async (name, limit = 100, skip = 0) => {
  try {
    const regex = escapeStringRegexp(name);
    console.log("reges", regex);

    let products = await ProductModel.aggregate([
      { $match: { name: { $regex: regex, $options: "i" } } },
      {
        $project: {
          type: 1,
          _id: 1,
          authors: 1,
          average_rating: 1,
          isbn: 1,
          language_code: 1,
          ratings_count: 1,
          price: 1,
          name: { $substr: ["$name", 0, 100] },
        },
      },
    ])
      .skip(skip)
      .limit(limit);

    // let products = await ProductModel.find({
    //   name: { $regex: regex, $options: "i" },
    // }).skip(skip)
    //   .limit(limit);
    return products;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  retrieveProducts,
  searchProducts,
};
