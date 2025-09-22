# Arena Gateway

Este proyecto es una aplicación web completa que consta de un frontend desarrollado con Angular y un backend desarrollado con NestJS.

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

El backend está construido con **NestJS 11**, un marco de trabajo de Node.js para construir aplicaciones eficientes y escalables del lado del servidor.

Características clave:

*   Utiliza **Express.js** como el servidor HTTP subyacente.
*   Incluye `axios` y `cheerio` como dependencias, lo que sugiere que el backend puede estar haciendo web scraping de otras fuentes para recopilar datos de eventos.
*   La estructura sigue las convenciones estándar de NestJS con controladores, módulos y servicios.

## Cómo empezar

A continuación se detallan los pasos para poner en marcha tanto el frontend como el backend.

### Prerrequisitos

*   Node.js (que incluye npm)
*   Angular CLI (`npm install -g @angular/cli`)
*   NestJS CLI (`npm install -g @nestjs/cli`)

### Backend

1.  Navegue al directorio `backend`:
    ```bash
    cd backend
    ```
2.  Instale las dependencias:
    ```bash
    npm install
    ```
3.  Inicie el servidor de desarrollo:
    ```bash
    npm run start:dev
    ```
    El backend se ejecutará en el puerto que NestJS define por defecto (normalmente el 3000).

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

*   `npm run build`: Compila la aplicación para producción.
*   `npm run format`: Formatea el código usando Prettier.
*   `npm run start`: Inicia la aplicación.
*   `npm run start:dev`: Inicia la aplicación en modo de observación.
*   `npm run lint`: Realiza el linting del código.
*   `npm test`: Ejecuta las pruebas unitarias.

### Frontend

*   `npm start`: Inicia el servidor de desarrollo.
*   `npm run build`: Compila la aplicación para producción.
*   `npm test`: Ejecuta las pruebas unitarias con Karma.
*   `npm run watch`: Compila la aplicación en modo de observación.
