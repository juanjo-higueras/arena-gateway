# Arena Gateway

Arena Gateway es una aplicación web que proporciona una interfaz fácil de usar para explorar los eventos del Festival de Ópera de la Arena de Verona. Extrae datos del sitio web oficial y los presenta de una manera limpia y organizada.

## Características

- **Listado de eventos:** Vea una lista de las próximas representaciones de ópera en la Arena de Verona.
- **Filtrado de eventos:** Filtre los eventos por fecha y miembros del elenco.
- **Información detallada:** Obtenga detalles sobre cada actuación, incluido el elenco y un enlace para comprar entradas.
- **Descripciones de óperas:** Lea resúmenes de las óperas que se representan.

## Cómo funciona

La aplicación consta de un backend de Node.js y un frontend creado con HTML, CSS y JavaScript.

- **Backend:** El backend es un servidor Express que utiliza `axios` para obtener el contenido del sitio web de la Arena de Verona y `cheerio` para analizar el HTML y extraer los datos del evento. Expone una API simple para que el frontend la consuma.
- **Frontend:** El frontend es una aplicación de una sola página que obtiene datos de la API del backend y representa dinámicamente la información del evento. Utiliza Tailwind CSS para el estilo.

## Cómo empezar

Para ejecutar la aplicación localmente, siga estos pasos:

1. **Clone el repositorio:**
   ```bash
   git clone https://github.com/juanjohigueras/arena-gateway.git
   ```

2. **Instale las dependencias:**
   ```bash
   npm install
   ```

3. **Inicie el servidor:**
   ```bash
   npm start
   ```

4. **Abra su navegador:**
   - Reemplace:

   ```bash
   const apiUrl = 'https://arena-gateway.vercel.app/events';
   const festivalInfoUrl = 'https://arena-gateway.vercel.app/festival-info';
   ```
   por:

   ```bash
   const apiUrl = 'http://localhost:3000/events';
   const festivalInfoUrl = 'http://localhost:3000/festival-info';
   ```

   - Cargue la página index.html en el navegador.

## Descargo de responsabilidad

Este no es el sitio web oficial de la Fondazione Arena di Verona. Es una herramienta de visualización de datos. Los enlaces "Comprar entradas" y "Ver detalles" lo redirigirán al sitio web oficial. Para su seguridad, verifique que la URL comience con `https://www.arena.it` antes de realizar cualquier pago.