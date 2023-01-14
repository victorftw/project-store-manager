const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await productsServices.getProductsById(id);
  res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getProductsById,
};
