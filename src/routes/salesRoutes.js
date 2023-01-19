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

module.exports = salesRouter;
