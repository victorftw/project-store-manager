const conn = require('./connection');

const register = async () => {
  const query = 'INSERT INTO sales (date) VALUE (NOW())';

  const [{ insertId }] = await conn.execute(query);

  return insertId;
};

const registerSales = async (sales) => {
  const values = [];

  const id = await register();
  sales.forEach(({ productId, quantity }) => values.push(id, productId, quantity));

  const queryPlaceholders = Array(sales.length).fill('(?, ?, ?)').join(', ');
  const query = `
    INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ${queryPlaceholders}
  `;

  await conn.execute(query, values);

  return { id, itemsSold: sales };
};

const findProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[products]] = await conn.execute(query, [id]);
  return products;
};

module.exports = {
  registerSales,
  findProductById,
};
