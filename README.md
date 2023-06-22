# Titulo

Almacen de imagenes.

# Contacto

    Iván Moreno Quirós
    ivan@solwed.es
    SOLWED.ES✌️

# Descripción

El proyecto es una prueba tecnica para Añadir, Leer, Modificar y Borrar imagenes de una base de datos.
Esta realizado con React en la parte de cliente, Express en la parte de servidor y MySQL en la parte de base de datos.
Tambien se ha utilizado bootstrap para algunos componentes y diseño de la app.

# Como empezar el proyecto

He dividido el proyecto en dos partes:
1º: un servidor, que hace de API y conecta las llamadas del protocolo http en el post a la base de datos en MySQL
2º: un cliente, para que el usuario pueda ver, editar y borrar todas las imagenes.

## Base de datos

Para empezar este proyecto, tendremos que instalar la base de datos incluida en el proyecto en un servidor MySQL.
![Alt text](<CleanShot 2023-06-22 at 10.56.14@2x.png>)

## Servidor

Despues tendremos que ejecutar el servidor con node (npm run start). Si hay algun problema borrar la carpeta node_modules y ejecutar (npm install).
Importante añadir en el servidor de MySQL la siguiente configuración.
![Configuracion de tamaño de imagenes en servidor mysql](<CleanShot 2023-06-19 at 17.21.23@2x.png>)

## Cliente

Ejecutar la parte del cliente con node (npm run start). Si hay algun problema borrar la carpeta node_modules y ejecutar (npm install).

Despues accedemos al localhost:3000 (puerto 3000) y podremos ver el cliente.

# Uso

Se puede utilizar para la carga de imagenes en cualquier servidor donde lo instalemos.

# Estructura de archivos

En la parte del cliente tenemos una instalacion de React de tal manera:

![Alt text](<CleanShot 2023-06-22 at 10.45.33@2x.png>)

# Contenido del proyecto

Podemos ver y analizar los diferentes apartados del proyecto desde la misma pantalla:

## CREATE

Nos muestra un formulario el cual podemos rellenar para ponerle un titulo y agregar un archivo.
El programa subira el archivo al servidor y lo guardara en la carpeta images.
Tambien subira la ruta del archivo y el titulo a la base de datos.

## READ

La aplicacion nos muestra en tiempo real todas las fotos insertadas en la Base de datos.

## UPDATE

La edición no se contempla en esta aplicación ya que puedes borrar las imagenes y volver a introducirlas.

## DELETE

Al pulsar en una Imagen se puede ver en grande y pulsar el boton de borrar para borrarla.

## Tecnologias utilizadas

Se ha utilizado una base de datos en MySQL, node.js como gestor de paquetes, un servidor con Express.js (Nodemon para que se autoejecute), React para el cliente con algunas dependencias como: 'react-modal'

## Estado

Es un programa de prueba, no se encuentra en desarrollo ni se pretende seguir desarrollandolo.
