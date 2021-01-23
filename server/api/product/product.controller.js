const { retrieveProducts, searchProducts } = require("./product.service");

const getProductsController = async (req, res, next) => {
  console.log(req.query);
  let limit = parseInt(req.query.limit) || 100;
  let skip = parseInt(req.query.skip) || 0;
  let name = req.query.name && req.query.name.trim();
  let order = req.query.order || "desc";
  console.log("");
  try {
    let products;
    if (name) products = await searchProducts({ name, limit, skip, order });
    else products = await retrieveProducts({ limit, skip, order });
    res.status(200).send({ products });
  } catch (e) {
    // console.error(e.message);
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  getProductsController,
};
