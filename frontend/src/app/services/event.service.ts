import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { FestivalInfo } from '../models/festival-info.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);

  private apiUrl = 'https://juanjohigueras.com/verona/api';

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  getFestivalInfo(): Observable<FestivalInfo> {
    return this.http.get<FestivalInfo>(`${this.apiUrl}/festival-info`);
  }
}
