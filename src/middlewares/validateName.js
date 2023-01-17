const validateName = (req, res, next) => {
  const { name } = req.body;

  return !name
    ? res.status(400).json({ message: '"name" is required' })
    : next();
};

module.exports = validateName;
