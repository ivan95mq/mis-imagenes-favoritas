const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor de imagenes");
});

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define el nombre del archivo guardado
  },
});

const upload = multer({ storage: diskstorage }).single("imagen");

//POST
router.post("/images/post", upload, (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("server error" + err);
    if (req.body) {
      const titulo = req.body.titulo;
      if (req.file) {
        const type = req.file.mimetype;
        const name = req.file.originalname;
        const data = fs.readFileSync(
          path.join(__dirname, "../images/" + req.file.filename)
        );
        conn.query(
          "INSERT INTO image set ?",
          [{ titulo, type, name, data }],
          (err, rows) => {
            if (err) return res.status(500).send("query error" + err);
            res.json({ message: "¡Imagen guardada!" });
          }
        );
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
