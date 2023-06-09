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

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  try {
    const response = await salesServices.updateSale(Number(id), sales);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    await salesServices.deleteSale(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
