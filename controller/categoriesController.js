const Category = require("../models/category");

module.exports = {
  async create(req, res, next) {
    try {
      const category = req.body;
      const data = await Category.create(category);
      return res.status(201).json({
        message: "Categoria creada correctamente",
        success: true,
        data: data.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        message: "Hubo un error al crear la categoria",
        success: false,
        error: error,
      });
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await Category.getAll();
      console.log(JSON.stringify(data));
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(502).json({
        success: false,
        message: "Error al obtener las categorias",
      });
    }
  },
};
