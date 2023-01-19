const salesModel = require('../models/salesModel');

const validateProductId = async (req, res, next) => {
  const newSale = req.body;

  const response = await Promise.all(newSale.map(({ productId }) =>
    salesModel.findProductById(productId)));

  const result = response.some((element) => !element);

  if (result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return next();
};

module.exports = validateProductId;
