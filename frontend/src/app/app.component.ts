import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WarningComponent } from './components/warning/warning.component';
import { FiltersComponent } from './components/filters/filters.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { OperaModalComponent } from './components/opera-modal/opera-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    WarningComponent,
    FiltersComponent,
    EventListComponent,
    FooterComponent,
    OperaModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'verona-front';
}
