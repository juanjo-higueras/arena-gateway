// Importar los módulos necesarios
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

// Definir la clase del scraper
class ArenaVeronaOperaScraper {
  constructor() {
    this.baseUrl = 'https://www.arena.it/arena-opera-festival/';
    this.eventsUrl = 'https://www.arena.it/en/arena-verona-opera-festival/events/';
  }

  async fetchPageContent(url) {
    try {
      console.log(`Buscando contenido de la página: ${url}`);
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Error al obtener el contenido de ${url}: ${error.message}`);
      throw error;
    }
  }

  async scrapeFestivalInfo() {
    try {
      const html = await this.fetchPageContent(this.baseUrl);
      const $ = cheerio.load(html);

      let edition = null;
      const editionElement = $('header.heading .title.hp .small');
      if (editionElement) {
        edition = editionElement.text().trim();
        console.log(`⭐ Edición encontrada: ${edition}`);
      }

      return { edition };

    } catch (error) {
      console.error('Error al hacer scraping de la información del festival con Axios/Cheerio:', error);
      throw error;
    }
  }

  async scrapeEventDetails(url) {
    try {
      console.log(`Extrayendo detalles de la página: ${url}`);
      const html = await this.fetchPageContent(url);
      const $ = cheerio.load(html);
      
      const eventData = [];
      const eventBlocks = $('ul.listing-data-show.cast.bh-accordion > li');

      eventBlocks.each((index, block) => {
        const timeElement = $(block).find('time[datetime]');
        const rawDate = timeElement.attr('datetime');

        if (rawDate && rawDate.includes('2026')) {
          const dateObj = new Date(rawDate);
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          const hours = String(dateObj.getHours()).padStart(2, '0');
          const minutes = String(dateObj.getMinutes()).padStart(2, '0');
          const formattedDate = `${day}.${month}.${year} - ${hours}:${minutes}`;

          const castList = [];
          const castRows = $(block).find('table.tbl.cast tbody th');
          castRows.each((castIndex, row) => {
            castList.push($(row).text().trim());
          });

          const buyTicketsLinkElement = $(block).find('a.btn.primary.full-down-sm');
          const buyTicketsLink = buyTicketsLinkElement.attr('href') || null;

          eventData.push({
            date: formattedDate,
            cast: castList,
            buyTicketsLink: buyTicketsLink
          });
        }
      });
      return eventData;
    } catch (error) {
      console.error(`❌ Error al extraer detalles de ${url}: ${error.message}`);
      return [];
    }
  }

  async scrapeEvents() {
    try {
      const html = await this.fetchPageContent(this.eventsUrl);
      const $ = cheerio.load(html);
      const results = new Set();
      const allDivs = $('div');

      allDivs.each((index, div) => {
        const eventTags = $(div).find('div.tag');
        const tagsArray = eventTags.map((i, el) => $(el).text()?.trim()).get();

        const hasOperaTag = tagsArray.some(tag => tag === 'Opera');
        const has2026Tag = tagsArray.some(tag => tag === '2026');
        const hasOnlyAllowedTags = tagsArray.every(tag => tag === 'Opera' || tag === '2026');

        if (hasOperaTag && has2026Tag && hasOnlyAllowedTags) {
          const titleElement = $(div).find('h1, h2, h3, .title, .event-title, a').first();
          const title = titleElement?.text()?.trim() || 'Título no encontrado';

          const linkElement = $(div).find('a').first();
          let url;
          if (linkElement.length) {
            const href = linkElement.attr('href');
            url = href ? (href.startsWith('http') ? href : `https://www.arena.it${href}`) : undefined;
          }

          if (title !== 'Título no encontrado' && url && url.includes('arena-verona-opera-festival')) {
            results.add(JSON.stringify({
              title,
              url,
              details: []
            }));
          }
        }
      });

      const events = Array.from(results).map(item => JSON.parse(item));

      for (const event of events) {
        const details = await this.scrapeEventDetails(event.url);
        event.details = details;
      }

      return events;

    } catch (error) {
      console.error('Error al hacer scraping con Axios/Cheerio:', error);
      throw error;
    }
  }
}

// Inicializar el servidor Express
const app = express();
const port = process.env.PORT || 3000;
const scraper = new ArenaVeronaOperaScraper();

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Definir la ruta de la API para los eventos
app.get('/events', async (req, res) => {
  console.log('Recibida una solicitud GET para /events');
  try {
    const events = await scraper.scrapeEvents();
    res.json(events);
  } catch (error) {
    console.error('Error en la ruta /events:', error);
    res.status(500).json({
      error: 'Error al obtener los eventos',
      details: error.message
    });
  }
});

// Ruta para obtener la información del festival
app.get('/festival-info', async (req, res) => {
  console.log('Recibida una solicitud GET para /festival-info');
  try {
    const info = await scraper.scrapeFestivalInfo();
    if (info) {
      res.json(info);
    } else {
      res.status(404).json({ error: 'Información del festival no encontrada.' });
    }
  } catch (error) {
    console.error('Error en la ruta /festival-info:', error);
    res.status(500).json({
      error: 'Error al obtener la información del festival',
      details: error.message
    });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
  console.log(`Visita http://localhost:${port}/events para ver los datos de los eventos.`);
  console.log(`Visita http://localhost:${port}/festival-info para ver la información del festival.`);
});
