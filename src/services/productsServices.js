const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const searchByTerm = async (q) => {
  const product = await productsModel.searchByTerm(q);
  return product;
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

const updateProduct = async ({ id, name }) => {
  const response = await productsModel.updateProduct({ id, name });

  const notFound = await productsModel.getProductsById(id);

  if (!notFound) throw new Error('Product not found');

  return response;
};

const deleteProduct = async (id) => {
  const notFound = await productsModel.getProductsById(id);

  if (!notFound) throw new Error('Product not found');

  const response = await productsModel.deleteProduct(id);

  return response;
};

module.exports = {
  getAll,
  getProductsById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchByTerm,
};
