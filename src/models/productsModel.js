const conn = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await conn.execute(query);
  return products;
};

const getProductsById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ? ORDER BY id';
  const [[products]] = await conn.execute(query, [id]);
  return products;
};

module.exports = {
  getAll,
  getProductsById,
};
