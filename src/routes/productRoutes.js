const { Router } = require('express');
const productsController = require('../controllers/productsController');
const validateName = require('../middlewares/validateName');

const productRouter = Router();

productRouter.get('/products', productsController.getAll);

productRouter.get('/products/:id', productsController.getProductsById);

productRouter.post('/products', validateName, productsController.registerProduct);

module.exports = productRouter;
