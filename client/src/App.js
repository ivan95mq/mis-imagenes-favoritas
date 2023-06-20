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
      .then((res) => setImageList(res))
      .catch((err) => {
        console.error(err);
      });
    setImageUpdate(false);
  }, [imageUpdate]);

  // const selectedHandler = (e) => {
  //   setTitulo(e.target.text);
  //   setFile(e.target.files[0]);
  // };

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
      .then((res) => res.text())
      .then((res) => console.log(res), setImageUpdate(true))
      .catch((err) => {
        console.error(err);
      });

    document.getElementById("fileinput").value = null;
    setTitulo("");
    setFile(null);
  };

  const modalHandler = (imagen) => {
    setimagenActual(imagen);
    setmodalOpen(true);
  };
  const deleteHandler = (id) => {
    fetch("localhost:9000/images/delete/" + imagenActual, { method: "DELETE" })
      .then((res) => res.text())
      .then((res) => console.log(res));
    setImageUpdate(true);
    setmodalOpen(false);
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
                className="form-control"
                type="text"
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="col-5">
              Sube tu imagen:
              <input
                id="fileinput"
                onChange={(e) => setFile(e.target.value)}
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
              onClick={() => deleteHandler()}
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
