const User = require("../models/user");
const Rol = require("../models/rol");

const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const storage = require("../utils/cloud_storage");

module.exports = {
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(502).json({
        success: false,
        message: "Error al obtener los usuarios",
      });
    }
  },

  async findById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await User.findUserByid(id);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(502).json({
        success: false,
        message: "Error al obtener el usuario por id",
      });
    }
  },

  async register(req, res, next) {
    try {
      const user = req.body;
      const data = await User.create(user);
      await Rol.create(data.id, 1);

      return res.status(201).json({
        success: true,
        message: "El registro se realizo correctamente, ahora inicia sesión",
        data: data.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        success: false,
        message: "Hubo un error con el registro del usuario",
        error: error,
      });
    }
  },

  async registerWithImage(req, res, next) {
    try {
      const user = JSON.parse(req.body.user);
      const files = req.files;
      if (files.length > 0) {
        const pathImage = `image_${Date.now()}`;
        const url = await storage(files[0], pathImage);

        if (url != undefined && url != null) {
          user.image = url;
        }
      }
      const data = await User.create(user);
      await Rol.create(data.id, 1);

      return res.status(201).json({
        success: true,
        message: "El registro se realizo correctamente, ahora inicia sesión",
        data: data.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        success: false,
        message: "Hubo un error con el registro del usuario",
        error: error,
      });
    }
  },

  async update(req, res, next) {
    try {
      const user = JSON.parse(req.body.user);
      const files = req.files;
      if (files.length > 0) {
        const pathImage = `image_${Date.now()}`;
        const url = await storage(files[0], pathImage);

        if (url != undefined && url != null) {
          user.image = url;
        }
      }
      await User.update(user);

      return res.status(201).json({
        success: true,
        message: "Los datos del usuario se actualizaron correctamente",
      });
    } catch (error) {
      console.log(error);
      return res.status(501).json({
        success: false,
        message: "Hubo un error con la actualizacion de datos del usuario",
        error: error,
      });
    }
  },

  async login(req, res, next) {
    try {
      const data = req.body;

      const user = await User.findByEmail(data.email);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email no encontrado",
        });
      }
      if (User.isPasswordMatched(data.password, user.password)) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          keys.secretOrKey,
          {
            // expiresIn: (60*60+24)
          }
        );

        const dataUser = {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          image: user.image,
          session_token: `JWT ${token}`,
          roles: user.roles,
        };

        await User.updateToken(user.id, `JWT ${token}`);

        return res.status(201).json({
          success: true,
          data: dataUser,
          message: "Usuario autenticado",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Contraseña incorrecta",
        });
      }
    } catch (error) {
      return res.status(501).json({
        success: false,
        message: "Hubo un error con el login del usuario",
        error: error,
      });
    }
  },
};
