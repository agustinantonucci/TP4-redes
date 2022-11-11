const sql = require("./db.js");

// constructor
const Medico = function (medico) {
  this.nombreCompleto = medico.nombreCompleto;
  this.especialidad = medico.especialidad;
};

Medico.create = (newMedico, result) => {
  sql.query("INSERT INTO medico SET ?", newMedico, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("medico creado: ", { id: res.insertId, ...newMedico });
    result(null, { id: res.insertId, ...newMedico });
  });
};

Medico.findById = (id, result) => {
  sql.query(`SELECT * FROM medico WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("se encontró médico: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found medico with the id
    result({ kind: "not_found" }, null);
  });
};

Medico.getAll = (title, result) => {
  let query = "SELECT * FROM medico";

  if (title) {
    query += ` WHERE nombre LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Medicos: ", res);
    result(null, res);
  });
};

Medico.updateById = (id, medico, result) => {
  sql.query(
    "UPDATE medico SET nombreCompleto = ?, especialidad = ? WHERE id = ?",
    [medico.nombreCompleto, medico.especialidad, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found medico with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("medico actualizado: ", { id: id, ...medico });
      result(null, { id: id, ...medico });
    }
  );
};

Medico.remove = (id, result) => {
  sql.query("DELETE FROM medico WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found medico with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("medicos eliminados con id: ", id);
    result(null, res);
  });
};


module.exports = Medico;
