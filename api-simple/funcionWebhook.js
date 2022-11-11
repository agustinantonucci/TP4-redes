const axios = require("axios");
const medicoWebhook = axios.create({
  baseURL: "http://localhost:3000",
});
module.exports.enviarMensaje = async (mensaje, data) => {
  const token = await medicoWebhook
    .get("/webhook", {
      headers: {
        authorization: "777",
      },
    })
    .then((resp) => {
      return resp;
    })
    .catch((error) => {
      console.log("Error webhook", error);
    });

  if (token.status === 200) {
    const resp = await medicoWebhook
      .post(
        "/webhook",
        { message: `${mensaje}`, data: data },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "777",
          },
        }
      )
      .then((resp) => {
        return resp.data.output;
      })
      .catch((error) => {
        console.log("Error webhook", error);
      });

    return resp;
  } else {
    console.log("Error de autenticación");
  }
};
