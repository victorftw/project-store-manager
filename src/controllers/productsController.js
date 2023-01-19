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
  try {
    const response = await productsServices.registerProduct({ name });
    res.status(201).json(response);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const response = await productsServices.updateProduct({ id, name });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productsServices.deleteProduct(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getProductsById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
