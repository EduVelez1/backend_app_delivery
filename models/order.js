const db = require("../config/config");
const Order = {};

Order.findByStatus = (status) => {
  const sql = `
  SELECT 
  O.*,
  JSON_BUILD_OBJECT(
  	'id', U.id,
  	'name', U.name,
  	'lastname', U.lastname,
  'image', U.image) AS client,
    JSON_BUILD_OBJECT(
  	'id', A.id,
  	'address', A.address,
  	'detail', A.detail) AS address,
	JSON_AGG(
	 JSON_BUILD_OBJECT(
  	'id', P.id,
  	'name', P.name,
  	'description', P.description,
    'price', CAST(P.price AS VARCHAR),
    'image1', P.image1,
    'quantity', CAST(OHP.quantity AS VARCHAR)   ) 
) AS products
  FROM
  orders AS O
  INNER JOIN
  users AS U
  ON 
  O.id_client = U.id
  INNER JOIN 
  address AS A
  ON
  A.id = O.id_address
  INNER JOIN 
  order_has_products AS OHP
  ON 
  OHP.id_order = O.id
  INNER JOIN 
  products AS P
  ON
  P.id = OHP.id_product

  WHERE
  O.STATUS = $1
  
  GROUP BY
  O.id, U.id, A.id


  
  `;
  return db.manyOrNone(sql, [status]);
};

Order.findByDelivery = (status, idDelivery) => {
  const sql = `
  SELECT 
  O.*,
  JSON_BUILD_OBJECT(
  	'id', U.id,
  	'name', U.name,
  	'lastname', U.lastname,
  'image', U.image) AS client,
    JSON_BUILD_OBJECT(
  	'id', A.id,
  	'address', A.address,
  	'detail', A.detail) AS address,
	JSON_AGG(
	 JSON_BUILD_OBJECT(
  	'id', P.id,
  	'name', P.name,
  	'description', P.description,
    'price', CAST(P.price AS VARCHAR),
    'image1', P.image1,
    'quantity', CAST(OHP.quantity AS VARCHAR)   ) 
) AS products
  FROM
  orders AS O
  INNER JOIN
  users AS U
  ON 
  O.id_client = U.id
  INNER JOIN 
  address AS A
  ON
  A.id = O.id_address
  INNER JOIN 
  order_has_products AS OHP
  ON 
  OHP.id_order = O.id
  INNER JOIN 
  products AS P
  ON
  P.id = OHP.id_product

  WHERE
  O.STATUS = $1 AND O.id_delivery = $2
  
  GROUP BY
  O.id, U.id, A.id


  
  `;
  return db.manyOrNone(sql, [status, idDelivery]);
};

Order.create = (order) => {
  const sql = `INSERT INTO orders(
    id_client,
    id_address,
    status,
    timestamp,
    created_at,
    updated_at)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

  return db.oneOrNone(sql, [
    order.id_client,
    order.id_address,
    order.status,
    Date.now(),
    new Date(),
    new Date(),
  ]);
};
Order.update = (order) => {
  const sql = `UPDATE orders
  SET
    id_client = $2,
    id_address = $3,
    id_delivery = $4,
    status = $5,
    updated_at = $6
  WHERE
   id = $1
      `;

  return db.oneOrNone(sql, [
    order.id,
    order.id_client,
    order.id_address,
    order.id_delivery,
    order.status,
    new Date(),
  ]);
};

module.exports = Order;
