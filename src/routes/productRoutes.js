const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productRouter = Router();

productRouter.get('/products', productsController.getAll);

productRouter.get('/products/:id', productsController.getProductsById);

module.exports = productRouter;
