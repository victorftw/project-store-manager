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

const registerProduct = async ({ name }) => {
  const query = 'INSERT INTO products (name) VALUES(?)';
  const [{ insertId }] = await conn.execute(query, [name]);
  return insertId;
};

const updateProduct = async ({ id, name }) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  await conn.execute(query, [name, id]);
  return { id, name };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await conn.execute(query, [id]);
  return true;
};

module.exports = {
  getAll,
  getProductsById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
