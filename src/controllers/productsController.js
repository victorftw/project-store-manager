const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const response = await productsServices.getAll();
  res.status(200).json(response);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productsServices.getProductsById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const response = await productsServices.registerProduct({ name });
  res.status(201).json(response);
};

module.exports = {
  getAll,
  getProductsById,
  registerProduct,
};
