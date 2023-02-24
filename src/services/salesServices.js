const salesModel = require('../models/salesModel');

const registerSales = async (sales) => {
  const response = await salesModel.registerSales(sales);
  return response;
};

const getAllSales = async () => {
  const response = await salesModel.getAllSales();
  return response;
};

const getSaleById = async (id) => {
  const response = await salesModel.getSaleById(id);
  if (!response || response.length === 0) throw new Error('Sale not found');
  return response;
};

const deleteSale = async (id) => {
  const response = await salesModel.deleteSale(id);
  if (!response) throw new Error('Sale not found');
  return response;
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
  deleteSale,
};
