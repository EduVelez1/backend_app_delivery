const CategoriesController = require("../controller/categoriesController");
module.exports = (app) => {
  app.post("/api/categories/create", CategoriesController.create);
  app.get("/api/categories/getAll", CategoriesController.getAll);
};
