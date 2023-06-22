import React, { Fragment, useState, useEffect } from "react";

import Modal from "react-modal";
function App() {
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [imageList, setImageList] = useState([]);
  const [imageUpdate, setImageUpdate] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [imagenActual, setimagenActual] = useState([]);
  useEffect(() => {
    //Asociamos el Modal al cuerpo del documento
    Modal.setAppElement("body");

    fetch("http://localhost:9000/images/get")
      .then((res) => res.json())
      .then((data) => setImageList(data))
      .catch((err) => {
        console.error(err);
      });
    setImageUpdate(false);
  }, [imageUpdate]);
  function removeExtension(filename) {
    // Buscar la última aparición del punto (.) en la cadena
    const lastIndex = filename.lastIndexOf(".");

    // Si se encuentra un punto, eliminar todo lo que viene después
    if (lastIndex !== -1) {
      return filename.slice(0, lastIndex);
    }

    // Si no se encuentra un punto, retornar la cadena original sin cambios
    return filename;
  }
  const handleImageChange = (e) => {
    // Verifica que `e` sea un objeto válido antes de acceder a sus propiedades
    if (e && e.target && e.target.files && e.target.files[0])
      setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    if (e && e.target && e.target.value) setTitulo(e.target.value);
  };

  const sendHandler = () => {
    if (!file) {
      alert("Tienes que añadir una imagen");
      return;
    }
    if (!titulo) {
      alert("Tienes que añadir un titulo");
    }

    const formdata = new FormData();
    formdata.append("titulo", titulo);
    formdata.append("imagen", file);
    fetch("http://localhost:9000/images/post", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setImageUpdate(true);
      })
      .catch((err) => {
        console.error(err);
      });

    document.getElementById("fileinput").value = null;
    document.getElementById("titulo").value = "";
    setTitulo("");
    setFile(null);
  };
  const deleteHandler = (img) => {
    const imgExt = removeExtension(img);
    fetch("http://localhost:9000/images/delete/" + imgExt, { method: "DELETE" })
      .then((res) => res.text())
      .then((res) => console.log(res));
    setImageUpdate(true);
    setmodalOpen(false);
  };
  const modalHandler = (imagen) => {
    setimagenActual(imagen);
    setmodalOpen(true);
  };

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">
            Aplicacion de imagenes
          </a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-5">
              Nombre:
              <input
                id="titulo"
                name="titulo"
                className="form-control"
                type="text"
                onChange={handleTitleChange}
              />
            </div>
            <div className="col-5">
              Sube tu imagen:
              <input
                id="fileinput"
                onChange={handleImageChange}
                className="form-control"
                type="file"
              />
            </div>
            <div className="col-2">
              <button
                onClick={sendHandler}
                type="button"
                className="btn btn-primary form-control mt-4"
              >
                Subir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-wrap mt-3 justify-content-center">
        {imageList.map((image) => (
          <div key={image} className="card m-2">
            <h5 className="text-center m-2"> {image}</h5>
            <img
              src={"http://localhost:9000/" + image}
              alt="..."
              className="card-img-top"
              style={{ height: "250px", width: "400px" }}
            ></img>
            <div className="card-body">
              <button
                className="btn btn-secondary"
                onClick={() => modalHandler(image)}
              >
                Ver imagen
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        style={{ content: { right: "15%", left: "15%" } }}
        isOpen={modalOpen}
        onRequestClose={() => setmodalOpen(false)}
      >
        <div className="card">
          <h3 className="text-center mt-2"> {imagenActual}</h3>
          <img
            src={"http://localhost:9000/" + imagenActual}
            alt="..."
            className="card-img-top "
            style={{
              height: "auto",
              width: "auto",
            }}
          ></img>
          <div className="card-body">
            <button
              onClick={() => deleteHandler(imagenActual)}
              className="btn btn-danger mx-5"
            >
              Borrar imagen
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default App;
