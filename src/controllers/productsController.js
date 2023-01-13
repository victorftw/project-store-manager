const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const products = await productsServices.getProductsById(id);
  return products
    ? res.status(200).json(products) : res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  getAll,
  getProductsById,
};
