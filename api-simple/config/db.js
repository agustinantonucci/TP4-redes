require('dotenv').config()

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: process.env.DB_PASSWORD,
  DB: "medicos",
  PORT: 3306,
};

// module.exports = {
//   HOST: "containers-us-west-51.railway.app",
//   USER: "root",
//   PASSWORD: "WsOtCVzI10pVajOVtuz8",
//   DB: "railway",
//   PORT: 6331,
// };