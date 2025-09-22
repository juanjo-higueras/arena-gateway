# verona-server

Este proyecto es una aplicación backend desarrollada con [NestJS](https://nestjs.com/) que se encarga de realizar web scraping de información relacionada con el Festival de la Arena de Verona. Utiliza `axios` para realizar las peticiones HTTP y `cheerio` para parsear el contenido HTML.

## Características

*   **Scraping de Información del Festival:** Extrae detalles generales sobre la edición actual del Festival de la Arena de Verona.
*   **Scraping de Eventos:** Obtiene una lista de eventos programados, incluyendo detalles como título, URL y un resumen de los detalles de cada evento (fecha, elenco, enlace para comprar entradas).

## Endpoints

La API expone los siguientes endpoints:

*   `GET /scraper/events`: Devuelve una lista de todos los eventos scrapeados, incluyendo sus detalles.
*   `GET /scraper/festival-info`: Devuelve información general sobre el festival, como la edición actual.

## Configuración del Proyecto

### Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
$ npm install
```

### Ejecución de la Aplicación

Puedes ejecutar la aplicación en diferentes modos:

*   **Modo Desarrollo (con recarga automática):**
    ```bash
    $ npm run start:dev
    ```
*   **Modo Producción:**
    ```bash
    $ npm run start:prod
    ```

### Pruebas

El proyecto incluye pruebas end-to-end (e2e) para verificar la funcionalidad de los endpoints de scraping.

*   **Ejecutar pruebas e2e:**
    ```bash
    $ npm run test:e2e
    ```

## Tecnologías Utilizadas

*   [NestJS](https://nestjs.com/) - Framework de Node.js para construir aplicaciones backend eficientes y escalables.
*   [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación que añade tipado estático a JavaScript.
*   [Axios](https://axios-http.com/) - Cliente HTTP basado en promesas para el navegador y Node.js.
*   [Cheerio](https://cheerio.js.org/) - Implementación rápida, flexible y concisa de jQuery diseñada específicamente para el servidor.

## Licencia

Este proyecto está bajo la licencia MIT.