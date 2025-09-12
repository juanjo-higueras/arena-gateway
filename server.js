// Importar los módulos necesarios
const express = require('express');
const puppeteer = require('puppeteer');

// Definir la clase del scraper
class ArenaVeronaOperaScraper {
  constructor() {
    this.baseUrl = 'https://www.arena.it/arena-opera-festival/';
    this.eventsUrl = 'https://www.arena.it/en/arena-verona-opera-festival/events/';
    // Se ha eliminado la caché, por lo que ya no es necesaria esta propiedad
  }

  async scrapeFestivalInfo() {
    // Se ha eliminado la lógica de caché para que siempre haga scraping
    
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      console.log(`Navegando a la página principal del festival: ${this.baseUrl}`);
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle2',
        timeout: 60000
      });

      const festivalInfo = await page.evaluate(() => {
        let edition = null;
        
        const editionElement = document.querySelector('header.heading .title.hp .small');
        if (editionElement) {
          edition = editionElement.textContent.trim();
          console.log(`⭐ Edición encontrada: ${edition}`);
        }
        
        return { edition };
      });
      
      // La asignación a la caché ha sido eliminada
      return festivalInfo;

    } catch (error) {
      console.error('Error al hacer scraping de la información del festival con Puppeteer:', error);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async scrapeEventDetails(url, page) {
    try {
      console.log(`Navegando a la página de detalles: ${url}`);
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 60000
      });

      const details = await page.evaluate(() => {
        const eventData = [];
        const eventBlocks = document.querySelectorAll('ul.listing-data-show.cast.bh-accordion > li');

        eventBlocks.forEach(block => {
          const timeElement = block.querySelector('time[datetime]');
          const rawDate = timeElement ? timeElement.getAttribute('datetime') : null;

          if (rawDate && rawDate.includes('2026')) {
            const dateObj = new Date(rawDate);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');
            const formattedDate = `${day}.${month}.${year} - ${hours}:${minutes}`;

            const castList = [];
            const castRows = block.querySelectorAll('table.tbl.cast tbody th');
            castRows.forEach(row => {
              castList.push(row.textContent.trim());
            });

            const buyTicketsLinkElement = block.querySelector('a.btn.primary.full-down-sm');
            const buyTicketsLink = buyTicketsLinkElement ? buyTicketsLinkElement.href : null;

            eventData.push({
              date: formattedDate,
              cast: castList,
              buyTicketsLink: buyTicketsLink
            });
          }
        });
        return eventData;
      });
      return details;
    } catch (error) {
      console.error(`❌ Error al extraer detalles de ${url}: ${error.message}`);
      return [];
    }
  }

  async scrapeEvents() {
    // Se ha eliminado la lógica de caché para que siempre haga scraping
    
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      console.log('Navegando a la página de eventos...');
      await page.goto(this.eventsUrl, {
        waitUntil: 'networkidle2',
        timeout: 60000
      });

      const events = await page.evaluate(() => {
        const results = new Set();
        const allDivs = document.querySelectorAll('div');

        allDivs.forEach((div) => {
          const eventTags = div.querySelectorAll('div.tag');
          const tagsArray = Array.from(eventTags).map(tag => tag.textContent?.trim());

          const hasOperaTag = tagsArray.some(tag => tag === 'Opera');
          const has2026Tag = tagsArray.some(tag => tag === '2026');
          const hasOnlyAllowedTags = tagsArray.every(tag => tag === 'Opera' || tag === '2026');

          if (hasOperaTag && has2026Tag && hasOnlyAllowedTags) {
            const titleElement = div.querySelector('h1, h2, h3, .title, .event-title, a');
            const title = titleElement?.textContent?.trim() || 'Título no encontrado';

            const linkElement = div.querySelector('a');
            let url;
            if (linkElement) {
              const href = linkElement.getAttribute('href');
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
        return Array.from(results).map(item => JSON.parse(item));
      });

      for (const event of events) {
        const details = await this.scrapeEventDetails(event.url, page);
        event.details = details;
      }
      
      // La asignación a la caché ha sido eliminada
      return events;

    } catch (error) {
      console.error('Error al hacer scraping con Puppeteer:', error);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
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
