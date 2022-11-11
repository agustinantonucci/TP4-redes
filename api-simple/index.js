const express = require("express");
require("dotenv").config();
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const { PASSWORD } = require("./config/db.js");
const axios  = require("axios");

const app = express();

var corsOptions = {
  origin: "*",
};

const microServicio = async (medico) => {
  const resp = await axios.post(
      "http://localhost:4000/log",
      {
        medico: medico
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
      }
    )
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      console.log("Error microservicio python: ", error);
    });

  console.log("Microservicio: ", resp);
  return resp;
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la api de medicos." });
});

app.post("/log", (req, res) => {
  let medico1 = req.body.medico[0];
  const resp = microServicio(medico1).then();
  res.json({ message: "Se envió usuario para log" });
});

require("./routes/medico.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
