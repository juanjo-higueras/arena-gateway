# Arena Gateway

Este proyecto es una aplicación web completa que consta de un frontend desarrollado con Angular y un backend desarrollado con Node.js y Express.

## Descripción

El proyecto "Arena Gateway" parece ser un portal para eventos, posiblemente relacionados con el anfiteatro de Verona, a juzgar por los nombres de los archivos. Permite a los usuarios ver una lista de eventos, filtrarlos y ver detalles sobre ellos.

### Frontend

El frontend es una aplicación de una sola página (SPA) creada con **Angular 18**. Utiliza **Tailwind CSS** para los estilos, lo que sugiere un enfoque moderno y basado en utilidades para la interfaz de usuario.

Componentes clave:

*   **EventCard:** Muestra información resumida sobre un solo evento.
*   **EventList:** Muestra una lista de componentes `EventCard`.
*   **Filters:** Permite a los usuarios filtrar los eventos.
*   **Header/Footer:** Componentes de diseño comunes.
*   **OperaModal:** Un modal que probablemente muestra información detallada sobre un evento.

Servicios:

*   **EventService:** Gestiona la recuperación de datos de eventos del backend.
*   **ModalService:** Controla el comportamiento del modal.

### Backend

El backend es una aplicación simple de **Node.js** que utiliza **Express.js** para crear la API.

Características clave:

*   Incluye `axios` y `cheerio` como dependencias, lo que sugiere que el backend puede estar haciendo web scraping de otras fuentes para recopilar datos de eventos.
*   El punto de entrada de la aplicación es `server-api.js`.

## Cómo empezar

A continuación se detallan los pasos para poner en marcha tanto el frontend como el backend.

### Prerrequisitos

*   Node.js (que incluye npm)
*   Angular CLI (`npm install -g @angular/cli`)

### Backend

1.  Navegue al directorio `backend`:
    ```bash
    cd backend
    ```
2.  Instale las dependencias:
    ```bash
    npm install
    ```
3.  Inicie el servidor:
    ```bash
    npm start
    ```
    El backend se ejecutará en el puerto 3000.

### Frontend

1.  Navegue al directorio `frontend`:
    ```bash
    cd frontend
    ```
2.  Instale las dependencias:
    ```bash
    npm install
    ```
3.  Inicie el servidor de desarrollo de Angular:
    ```bash
    npm start
    ```
    La aplicación de frontend estará disponible en `http://localhost:4200/`.

## Scripts disponibles

Ambos, el frontend y el backend, vienen con una serie de scripts para ayudar en el desarrollo:

### Backend

*   `npm start`: Inicia la aplicación.

### Frontend

*   `npm start`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila la aplicación para producción.
*   `npm test`: Ejecuta las pruebas unitarias con Karma.
*   `npm run watch`: Compila la aplicación en modo de observación.
