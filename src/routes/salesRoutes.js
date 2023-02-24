const { Router } = require('express');

const salesControllers = require('../controllers/salesControllers');
const validateRegisterNewSale = require('../middlewares/validateNewSale');
const validateProductId = require('../middlewares/validateProductId');

const salesRouter = Router();

salesRouter.post(
  '/sales',
  validateRegisterNewSale,
  validateProductId,
  salesControllers.registerSales,
);

salesRouter.get('/sales', salesControllers.getAllSales);

salesRouter.get('/sales/:id', salesControllers.getSaleById);

salesRouter.delete('/sales/:id', salesControllers.deleteSale);

module.exports = salesRouter;
