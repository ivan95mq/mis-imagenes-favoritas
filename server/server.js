const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const path = require("path");
const cors = require("cors");

//Iniciamos la app
const app = express();
//DATOS DE CONEXION A LA BASE DE DATOS
app.use(
  myconn(mysql, {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "images",
  })
);
//Inicamos el cors
app.use(cors());
//Hacemos el directorio statico para que se puedan atacar las imagenes.
app.use(express.static(path.join(__dirname, "dbimages")));
//Importamos las rutas
app.use(require("./routes/routes"));
//Iniciamos el servidor
app.listen(9000, () => {
  console.log("server running on", "http://localhost:" + 9000);
});
