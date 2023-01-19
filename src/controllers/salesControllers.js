const salesServices = require('../services/salesServices');

const registerSales = async (req, res) => {
  const response = await salesServices.registerSales(req.body);
  return res.status(201).json(response);
};

module.exports = {
  registerSales,
};
