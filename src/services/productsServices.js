const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getProductsById = async (id) => {
  const products = await productsModel.getProductsById(id);
  if (!products) throw new Error('Product not found');
  return products;
};

const registerProduct = async ({ name }) => {
  const id = await productsModel.registerProduct({ name });
  return { id, name };
};

module.exports = {
  getAll,
  getProductsById,
  registerProduct,
};
