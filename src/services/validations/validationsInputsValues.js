const { addNewProduct } = require('./schemas');

const validateNewProduct = ({ name }) => {
  const { error } = addNewProduct.validate({ name });

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
};
