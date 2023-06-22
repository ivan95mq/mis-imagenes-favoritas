import React, { Fragment, useState, useEffect } from "react";
import Modal from "react-modal";
import ModalCode from "./ModalCode";

function App() {
  const [archivo, setarchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [imagenLista, setimagenLista] = useState([]);
  const [imagenActualizar, setimagenActualizar] = useState(false);
  const [modalAbrir, setmodalAbrir] = useState(false);
  const [imagenActual, setimagenActual] = useState([]);

  //Utilizamos el hook de useEffect para poder cargar la aplicacion cada vez que haya un cambio en imagenActualizar
  useEffect(() => {
    //Asociamos el Modal al cuerpo del documento
    Modal.setAppElement("body");
    //Hacemos una llamada al servidor para cargar las imagenes
    fetch("http://localhost:9000/images/get")
      .then((res) => res.json())
      .then((data) => setimagenLista(data))
      .catch((err) => {
        console.error(err);
      });
    setimagenActualizar(false);
  }, [imagenActualizar]);
  /**
   * Enviamos al servidor todo lo que hay en el formulario.
   */
  const sendHandler = () => {
    if (!archivo) {
      alert("Tienes que añadir una imagen");
      return;
    }
    if (!titulo) {
      alert("Tienes que añadir un titulo");
    }

    const formdata = new FormData();
    formdata.append("titulo", titulo);
    formdata.append("imagen", archivo);
    fetch("http://localhost:9000/images/post", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setimagenActualizar(true);
      })
      .catch((err) => {
        console.error(err);
      });
    //ponemos las variables a vacio o nulo
    document.getElementById("archivoinput").value = null;
    document.getElementById("titulo").value = "";
    setTitulo("");
    setarchivo(null);
  };
  /**
   * Envia al servidor el titulo de una imagen para borrarla.
   * @param {*} img
   */
  const deleteHandler = (img) => {
    const imgExt = removeExtension(img);
    fetch("http://localhost:9000/images/delete/" + imgExt, { method: "DELETE" })
      .then((res) => res.text())
      .then((res) => console.log(res));
    setimagenActualizar(true);
    setmodalAbrir(false);
  };
  /**
   * Remueve la extension del archivo para que se quede solo con el nombre.
   * @param {*} archivoname
   * retorna una string sin formato.
   * @returns
   */
  const removeExtension = (archivoname) => {
    // Buscar la última aparición del punto (.) en la cadena
    const lastIndex = archivoname.lastIndexOf(".");

    // Si se encuentra un punto, eliminar todo lo que viene después
    if (lastIndex !== -1) {
      return archivoname.slice(0, lastIndex);
    }

    // Si no se encuentra un punto, retornar la cadena original sin cambios
    return archivoname;
  };

  /**
   * Actualizamos el estado de la imagen
   * @param {*} e
   */
  const handleImageChange = (e) => {
    // Verifica que `e` sea un objeto válido antes de acceder a sus propiedades
    if (e && e.target && e.target.archivos && e.target.archivos[0])
      setarchivo(e.target.archivos[0]);
  };
  /**
   * Actualizamos el estado del titulo
   * @param {*} e
   */
  const handleTitleChange = (e) => {
    if (e && e.target && e.target.value) setTitulo(e.target.value);
  };

  /**
   * Actualizamos el estado del modal para abrirlo
   * @param {*} imagen
   */
  const modalHandler = (imagen) => {
    setimagenActual(imagen);
    setmodalAbrir(true);
  };

  return (
    <Fragment>
      {/**
       * Creamos un navbar para ponerle un titulo a al aplicación.
       */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">
            Aplicacion de imagenes
          </a>
        </div>
      </nav>
      {/**
       * Empezamos el container y generamos el formulario
       */}

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
                id="archivoinput"
                onChange={handleImageChange}
                className="form-control"
                type="archivo"
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
      {/**
       * Empezamos el container y mostramos todas las imagenes.
       */}
      <div className="container d-flex flex-wrap mt-3 justify-content-center">
        {imagenLista.map((image) => (
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
      {/**
       * Generamos un Modal inactivo para cuando quieran pinchar en la imagen aparezca con zoom.
       */}
      <Modal
        style={{ content: { right: "15%", left: "15%" } }}
        isOpen={modalAbrir}
        onRequestClose={() => setmodalAbrir(false)}
      >
        <ModalCode imagenActual={imagenActual} deleteHandler={deleteHandler} />
      </Modal>
    </Fragment>
  );
}

export default App;
