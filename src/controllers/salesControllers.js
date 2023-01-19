const salesServices = require('../services/salesServices');

const registerSales = async (req, res) => {
  const response = await salesServices.registerSales(req.body);
  return res.status(201).json(response);
};

const getAllSales = async (_req, res) => {
  const response = await salesServices.getAllSales();
  return res.status(200).json(response);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await salesServices.getSaleById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
};
