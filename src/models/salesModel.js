const camelize = require('camelize');
const conn = require('./connection');

const register = async () => {
  const query = 'INSERT INTO sales (date) VALUE (NOW())';

  const [{ insertId }] = await conn.execute(query);

  return insertId;
};

const registerSales = async (sales) => {
  const values = [];

  const id = await register();
  sales.forEach(({ productId, quantity }) =>
    values.push(id, productId, quantity));

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

const getAllSales = async () => {
  const query = `SELECT
    sp.sale_id, s.date, sp.product_id, sp.quantity
        FROM
    sales_products AS sp
        INNER JOIN
    sales AS s ON s.id = sp.sale_id`;
  const [allSales] = await conn.execute(query);
  return camelize(allSales);
};

const getSaleById = async (id) => {
  const query = `SELECT
    s.date, sp.product_id, sp.quantity
        FROM
    sales_products AS sp
        INNER JOIN
    sales AS s ON s.id = sp.sale_id
        WHERE
    sp.sale_id = ?`;
  const [sales] = await conn.execute(query, [id]);
  return camelize(sales);
};

const updateSale = async (id, { productId, quantity }) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?';

  await conn.execute(query, [quantity, productId, id]);

  return { productId, quantity };
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [{ affectedRows }] = await conn.execute(query, [id]);
  return affectedRows;
};

module.exports = {
  registerSales,
  findProductById,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
