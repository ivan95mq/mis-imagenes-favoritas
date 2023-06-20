const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bienvenido a mi servidor de imagenes");
});

router.post("/images/post", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("server error" + err);
    const titulo = req.titulo;
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

        res.send("¡Imagen Guardada!");
      }
    );
  });
});
router.get("/images/get", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("server error" + err);

    conn.query("SELECT * FROM image", (err, rows) => {
      if (err) return res.status(500).send("query error" + err);

      rows.map((img) => {
        fs.writeFileSync(
          path.join(__dirname, "../dbimages/" + img.id + "-ivan.png"),
          img.data
        );
      });

      const imagedir = fs.readdirSync(path.join(__dirname, "../dbimages/"));
      res.json(imagedir);
    });
  });
});
router.delete("/images/delete/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(500).send("server error" + err);
    const id = req.params.id;

    conn.query("DELETE FROM image WHERE id = ?", [id], (err, rows) => {
      if (err) return res.status(500).send("query error" + err);

      fs.unlinkSync(__dirname, "../dbimages/" + id + "-ivan.png");

      res.send("imagen borrada");
    });
  });
});

module.exports = router;
