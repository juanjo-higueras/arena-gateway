import { Controller, Get, NotFoundException } from '@nestjs/common';
import { AppService, ScrapedEvent } from './app.service';

@Controller('scraper')
export class AppController {
  constructor(private readonly scraperService: AppService) {}

  @Get('events')
  async getEvents(): Promise<ScrapedEvent[]> {
    console.log('Recibida una solicitud GET para /scraper/events');
    const events = await this.scraperService.scrapeEvents();
    return events;
  }

  @Get('festival-info')
  async getFestivalInfo() {
    console.log('Recibida una solicitud GET para /scraper/festival-info');
    const info = await this.scraperService.scrapeFestivalInfo();
    if (!info || !info.edition) {
      throw new NotFoundException('Información del festival no encontrada.');
    }
    return info;
  }
}
