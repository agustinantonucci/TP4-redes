import "antd/dist/antd.css";
import { Button, Form, Modal, Select } from "antd";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [medicos, setMedicos] = useState();
  const [medicosSelect, setMedicosSelect] = useState([]);
  const [medico, setMedico] = useState();
  const [confirmacion, setConfirmacion] = useState(false);

  const onChange = (value) => {
    console.log(value);
    setMedico(
      medicos.filter((medico) => {
        return medico.id === value;
      })
    );
  };

  useEffect(() => {
    let resp = axios
      .get("http://localhost:8080/api/medicos")
      .then((resp) => {
        if (resp.status === 200) {
          setMedicos(resp.data);
          return resp.data;
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let array = [];
    if (medicos) {
      medicos.map((element) => {
        return array.push({
          value: element.id,
          label: element.nombreCompleto,
        });
      });
    }
    setMedicosSelect(array);
  }, [medicos]);

  const enviarMedico = async () => {
    if (medico) {
      console.log("medico: ", medico);
      const resp = await axios
        .post(
          "http://localhost:8080/log",
          {
            medico: medico,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            return resp.data;
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });

      if (resp.message) {
        setConfirmacion(true);
      }
    }
  };

  return (
    <div className="App">
      <Modal
        open={confirmacion}
        title="Registro realizado correctamente"
        onOk={() => setConfirmacion(false)}
        onCancel={() => setConfirmacion(false)}
      >
      </Modal>
      <div className="menu-wrapper">
        <p
          style={{
            fontSize: "26px",
            color: "white",
            fontWeight: "bold",
            marginBottom: "80px",
          }}
        >
          Registrar ingreso de médico
        </p>
        <Select
          style={{
            width: "200px",
            border: "1px solid coral",
            marginBottom: "50px",
          }}
          onChange={onChange}
          options={medicosSelect && medicosSelect}
          placeholder="Seleccione un médico"
        ></Select>
        <Button
          type="submit"
          className="botones"
          disabled={!medico}
          onClick={() => {
            enviarMedico();
          }}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}

export default App;
