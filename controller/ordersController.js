const Order = require("../models/order");
const OrderHasProducts = require("../models/order_has_products");

module.exports = {
  async create(req, res, next) {
    try {
      const order = req.body;
      order.status = "PENDIENTES";
      const data = await Order.create(order);

      for (const product of order.products) {
        await OrderHasProducts.create(data.id, product.id, product.quantity);
      }

      return res.status(201).json({
        message: "Orden creada correctamente",
        success: true,
        data: data.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        message: "Hubo un error al crear la orden",
        success: false,
        error: error,
      });
    }
  },
  async updateToDispatched(req, res, next) {
    try {
      const order = req.body;
      order.status = "DESPACHADOS";
      await Order.update(order);

      return res.status(201).json({
        message: "Orden se actualizo correctamente",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        message: "Hubo un error al actualizar la orden",
        success: false,
        error: error,
      });
    }
  },

  async successOrder(req, res, next) {
    try {
      const order = req.body;
      order.status = "ENTREGADOS";
      await Order.update(order);

      return res.status(201).json({
        message: "Orden se actualizo correctamente",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        message: "Hubo un error al actualizar la orden",
        success: false,
        error: error,
      });
    }
  },
  async findByStatus(req, res, next) {
    try {
      const data = await Order.findByStatus(req.params.status);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(502).json({
        success: false,
        message: "Error al obtener las ordenes",
      });
    }
  },

  async findByDelivery(req, res, next) {
    try {
      const data = await Order.findByDelivery(
        req.params.status,
        req.params.idDelivery
      );
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(502).json({
        success: false,
        message: "Error al obtener las ordenes",
      });
    }
  },
};
