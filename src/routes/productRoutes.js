const { Router } = require('express');
const productsController = require('../controllers/productsController');
const validateName = require('../middlewares/validateName');

const productRouter = Router();

productRouter.get('/products', productsController.getAll);

productRouter.get('/products/search', productsController.searchByTerm);

productRouter.get('/products/:id', productsController.getProductsById);

productRouter.post('/products', validateName, productsController.registerProduct);

productRouter.put('/products/:id', validateName, productsController.updateProduct);

productRouter.delete('/products/:id', productsController.deleteProduct);

module.exports = productRouter;
