const { enviarMensaje } = require("../funcionWebhook.js");
const Medico = require("../models/medico.model.js");

// const getConnection = require("../config/db.js");

const findAll = async (req, res) => {
  const nombre = req.query.nombreCompleto;
  Medico.getAll(nombre, (err, data) => {
    if(err)
      res.status(500).send({
        message: err.message || "Ocurrió un error mientras se buscaban medicos."
      });
    else {
      // enviarMensaje("Obtener todos los medicos", data);
      res.send(data);
    }
  });
  
  // const connection = await getConnection();

  // return connection.execute("select * from medico;");
};

const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Debe incluir un contenido",
    });
  }

  // Create a Medico
  const medico = new Medico({
    nombreCompleto: req.body.nombreCompleto,
    especialidad: req.body.especialidad,
  });

  // Save Medico in the database
  Medico.create(medico, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error mientras se creaba un medico.",
      });
    else {
      // enviarMensaje("Se creó un nuevo médico", data);
      res.send(data);
    }
  });
};

module.exports = {
  findAll,
  create
};
