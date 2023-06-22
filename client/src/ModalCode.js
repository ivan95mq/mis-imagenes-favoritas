import React from "react";

const ModalCode = ({ imagenActual, deleteHandler }) => {
  return (
    <div className="card">
      <h3 className="text-center mt-2">{imagenActual}</h3>
      <img
        src={"http://localhost:9000/" + imagenActual}
        alt="..."
        className="card-img-top"
        style={{
          height: "auto",
          width: "auto",
        }}
      />
      <div className="card-body">
        <button
          onClick={() => deleteHandler(imagenActual)}
          className="btn btn-danger mx-5"
        >
          Borrar imagen
        </button>
      </div>
    </div>
  );
};

export default ModalCode;
