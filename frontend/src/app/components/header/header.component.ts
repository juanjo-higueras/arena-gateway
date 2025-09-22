import { Component, OnInit, inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FestivalInfo } from '../../models/festival-info.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private eventService = inject(EventService);
  festivalInfo: FestivalInfo | undefined;

  ngOnInit(): void {
    this.eventService.getFestivalInfo().subscribe(info => {
      this.festivalInfo = info;
    });
  }

  get festivalEdition(): string {
    if (this.festivalInfo) {
      return this.festivalInfo.edition.replace(/\s\d{4}$/, '');
    }
    return 'Arena di Verona Opera Festival';
  }
}
