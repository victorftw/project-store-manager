const validateRegisterNewSale = (req, res, next) => {
  const newSale = req.body;

  const error = newSale.reduce((current, { productId, quantity }) => {
    const toVerify = { productId, quantity };
    const nonExistentField = Object.entries(toVerify).find((item) => item[1] === undefined);

    if (nonExistentField) {
      return { status: 400, message: `"${nonExistentField[0]}" is required` };
    }

    if (quantity < 1) {
      return { status: 422, message: '"quantity" must be greater than or equal to 1' };
    }

    return current;
  }, null);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  return next();
};

module.exports = validateRegisterNewSale;
