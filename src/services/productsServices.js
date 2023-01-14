const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getProductsById = async (id) => {
  const products = await productsModel.getProductsById(id);
  const error = new Error('Product not found');
  if (!products) throw error;
  return products;
};

module.exports = {
  getAll,
  getProductsById,
};
