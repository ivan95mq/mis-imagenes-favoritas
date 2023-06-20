# Titulo

Almacen de imagenes.

# Descripción

El proyecto es una prueba tecnica para Añadir, Leer, Modificar y Borrar imagenes de una base de datos.
Esta realizado con React en la parte de cliente, Express en la parte de servidor y MySQL en la parte de base de datos.
Tambien se ha utilizado bootstrap para algunos componentes y diseño de la app.

# Como empezar el proyecto

He dividido el proyecto en dos partes:
1º: un servidor, que hace de API y conecta las llamadas del protocolo http en el post a la base de datos en MySQL
2º: un cliente, para que el usuario pueda ver, editar y borrar todas las imagenes.

Para empezar este proyecto, tendremos que instalar la base de datos.
Despues tendremos que ejecutar el servidor con node (npm run start). Si hay algun problema borrar la carpeta node_modules y ejecutar (npm install).
Ejecutar la parte del cliente con node (npm run start). Si hay algun problema borrar la carpeta node_modules y ejecutar (npm install).

Despues accedemos al localhost:3000 (puerto 3000) y podremos ver el cliente.

# Uso

Se puede utilizar para la carga de archivos e imagenes en cualquier servidor donde lo instalemos.

# Estructura de archivos

En la parte del cliente tenemos una instalacion de React de tal manera:
├── node_modules
├── package-lock.json
├── package.json
├── public
│ ├── favicon.ico
│ ├── index.html
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ └── robots.txt
└── src
├── App.js
└── index.js

En la parte del servidor tenemos una instalacion de node con express de la siguiente manera:
├── node_modules
├── package-lock.json
├── package.json
├── routes
│ └── routes.js
└── server.js

# Contenido del proyecto

Podemos ver y analizar los diferentes apartados del proyecto desde la misma pantalla:

# CREATE

Nos muestra un formulario el cual podemos rellenar para ponerle un titulo y agregar un archivo.
El programa subira el archivo al servidor y lo guardara en la carpeta images.
Tambien subira la ruta del archivo y el titulo a la base de datos.

# READ

# UPDATE

# DELETE

## Tecnologias utilizadas

Licencia: Especifica la licencia bajo la cual se distribuye tu proyecto. Si no estás seguro de qué licencia utilizar, consulta recursos como choosealicense.com para obtener orientación.

Contacto: Proporciona información de contacto para que los usuarios puedan comunicarse contigo si tienen preguntas, problemas o comentarios sobre el proyecto.

Estado del proyecto: Si el proyecto está en desarrollo activo o ya no se mantiene, es útil incluir esta información para que los usuarios sepan qué esperar.

![Configuracion de tamaño de imagenes en servidor mysql](<CleanShot 2023-06-19 at 17.21.23@2x.png>)
