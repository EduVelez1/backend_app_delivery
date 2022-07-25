const OrderController = require("../controller/ordersController");
module.exports = (app) => {
  app.post("/api/orders/create", OrderController.create);
  app.get("/api/orders/findByStatus/:status", OrderController.findByStatus);
  app.get(
    "/api/orders/findByDelivery/:status/:idDelivery",
    OrderController.findByDelivery
  );
  app.put("/api/orders/successOrder", OrderController.successOrder);

  app.put("/api/orders/updateToDispatched", OrderController.updateToDispatched);
};
