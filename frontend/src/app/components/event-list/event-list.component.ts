import { Component, OnInit, inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';
import { Filters } from '../filters/filters.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  private eventService = inject(EventService);

  allEvents: Event[] = [];
  filteredEvents: Event[] = [];
  loading = true;
  error = false;

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.allEvents = data;
        this.filteredEvents = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  onFiltersChanged(filters: Filters): void {
    let filtered = this.allEvents;

    if (filters.cast) {
      const castFilter = filters.cast.toLowerCase();
      filtered = filtered.map(event => {
        const filteredDetails = event.details.filter(detail => detail.cast.join(' ').toLowerCase().includes(castFilter));
        if (filteredDetails.length > 0) return { ...event, details: filteredDetails };
        return null;
      }).filter((event): event is Event => event !== null);
    }
    
    if (filters.date) {
        const dateString = filters.date;
        const daysOffset = (filters.days === null || filters.days === undefined) ? 3 : filters.days;
        const filterDate = new Date(dateString);
        filterDate.setHours(0, 0, 0, 0);
        const startDate = new Date(filterDate); startDate.setDate(filterDate.getDate() - daysOffset); startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(filterDate); endDate.setDate(endDate.getDate() + daysOffset); endDate.setHours(0, 0, 0, 0);

        filtered = filtered.map(event => {
            const filteredDetails = event.details.filter(detail => {
            const dateParts = detail.date.split(' - ')[0].split('.');
            const detailDate = new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));
            detailDate.setHours(0, 0, 0, 0);
            return daysOffset === 0 ? detailDate.getTime() === filterDate.getTime() : detailDate.getTime() >= startDate.getTime() && detailDate.getTime() <= endDate.getTime();
            });
            if (filteredDetails.length > 0) return { ...event, details: filteredDetails };
            return null;
        }).filter((event): event is Event => event !== null);
    }

    this.filteredEvents = filtered;
  }
}