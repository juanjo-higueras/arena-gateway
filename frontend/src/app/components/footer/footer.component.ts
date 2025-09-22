import { Component, OnInit, inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FestivalInfo } from '../../models/festival-info.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  private eventService = inject(EventService);
  festivalInfo: FestivalInfo | undefined;

  ngOnInit(): void {
    this.eventService.getFestivalInfo().subscribe(info => {
      this.festivalInfo = info;
    });
  }

  get footerEdition(): string {
    if (this.festivalInfo) {
      const editionNumber = this.festivalInfo.edition.match(/^\d+/)?.[0];
      if (editionNumber) {
        return editionNumber + 'º';
      }
    }
    return '103º';
  }
}
