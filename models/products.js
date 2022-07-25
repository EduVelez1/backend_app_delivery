const db = require("../config/config");
const Products = {};

Products.findByCategory = (id_category) => {
  const sql = `SELECT
	P.id,
	P.name,
	P.description,
	P.price,
	P.image1,
	P.image2,
	P.image3,
	P.id_category
FROM
	products AS P
INNER JOIN
	categories AS C
ON
	P.id_Category = C.id
WHERE 
C.id = $1`;

  return db.manyOrNone(sql, id_category);
};

Products.findByCategoryAndProductName = (id_category, product_name) => {
  const sql = `SELECT
	P.id,
	P.name,
	P.description,
	P.price,
	P.image1,
	P.image2,
	P.image3,
	P.id_category
FROM
	products AS P
INNER JOIN
	categories AS C
ON
	P.id_Category = C.id
WHERE 
C.id = $1 AND P.name ILIKE $2`;

  return db.manyOrNone(sql, [id_category, `%${product_name}%`]);
};

Products.create = (products) => {
  const sql = `INSERT INTO products(name, description, price, image1, image2, image3, id_category, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;

  return db.oneOrNone(sql, [
    products.name,
    products.description,
    products.price,
    products.image1,
    products.image2,
    products.image3,
    products.id_category,
    new Date(),
    new Date(),
  ]);
};

Products.update = (products) => {
  const sql = `UPDATE products SET
  name = $2,
  description = $3,
  price = $4,
  image1 = $5,
  image2 = $6,
  image3 = $7,
  id_category = $8,
  updated_at = $9
    WHERE id = $1`;

  return db.none(sql, [
    products.id,
    products.name,
    products.description,
    products.price,
    products.image1,
    products.image2,
    products.image3,
    products.id_category,
    new Date(),
  ]);
};

module.exports = Products;
