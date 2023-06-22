const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor de imagenes");
});
//Utilizamos multer para guardar las fotos en una carpeta eventual
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define el nombre del archivo guardado
  },
});

const upload = multer({ storage: diskstorage }).single("imagen");

//POST
/**
 * Recibe un archivo y un texto llamado titulo
 */
router.post("/images/post", upload, (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("server error" + err);
    if (req.body) {
      if (req.file) {
        //Creamos el objeto a traves de los parametros.
        const imagen = {
          titulo: req.body.titulo,
          type: req.file.mimetype,
          name: req.file.originalname,
          data: fs.readFileSync(
            path.join(__dirname, "../images/" + req.file.filename)
          ),
        };
        //Hacemos la consulta de Inserccion pasandole el objeto de la imagen.
        conn.query("INSERT INTO image set ?", imagen, (err, rows) => {
          if (err) return res.status(500).send("query error" + err);
          res.json({ message: "¡Imagen guardada!" });
        });
      } else {
        res.status(400).send('Falta el campo "imagen" en la solicitud');
      }
    } else {
      // Manejar el caso cuando req.body no está definido
      res.status(400).send('Falta el campo "titulo" en la solicitud');
    }
  });
});
//GET
/**
 * Envia una lista con la ruta de las imagenes.
 */
router.get("/images/get", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("server error" + err);

    conn.query("SELECT * FROM image", (err, rows) => {
      if (err) return res.status(500).send("query error" + err);

      const writePromises = rows.map((img) => {
        const filePath = path.join(
          __dirname,
          "../dbimages/" + img.titulo + ".png"
        );
        const filePathCache = path.join(
          __dirname,
          "../images/" + img.titulo + ".png"
        );

        return new Promise((resolve, reject) => {
          fs.writeFile(filePath, img.data, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
      //Lo hacemos en una promesa para que sea Asincrono y no tarde en cargar.
      Promise.all(writePromises)
        .then(() => {
          const obj = fs.readdirSync(path.join(__dirname, "../dbimages/"));
          res.json(obj);
        })
        .catch((error) => {
          res.status(500).send("Error al escribir los archivos: " + error);
        });
    });
  });
});

// DELETE
/**
 * Recibe un texto con el titulo del archivo, lo recoge y lo borra de la base de datos y de la carpeta.
 */
router.delete("/images/delete/:img", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("server error" + err);

    const img = req.params.img;
    conn.query("DELETE FROM image WHERE titulo = ?", [img], (err, rows) => {
      if (err) return res.status(500).send("query error" + err);

      fs.unlinkSync(path.join(__dirname, "../dbimages/" + img + ".png"));

      res.send("imagen borrada");
    });
  });
});

module.exports = router;
