const { findByUser } = require("../models/address");
const Address = require("../models/address");

module.exports = {
  async create(req, res, next) {
    try {
      const address = req.body;
      const data = await Address.create(address);
      return res.status(201).json({
        message: "Direccion creada correctamente",
        success: true,
        data: data.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        message: "Hubo un error al crear la direccion",
        success: false,
        error: error,
      });
    }
  },

  async findByUser(req, res, next) {
    try {
      const data = await Address.findByUser(req.params.id_user);
      console.log(JSON.stringify(data));
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(502).json({
        success: false,
        message: "Error al obtener las direcciones",
      });
    }
  },
};
