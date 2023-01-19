const salesModel = require('../models/salesModel');

const registerSales = async (sales) => {
  const response = await salesModel.registerSales(sales);
  return response;
};

module.exports = {
  registerSales,
};
