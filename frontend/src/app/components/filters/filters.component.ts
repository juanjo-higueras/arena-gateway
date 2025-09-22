import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Filters {
  date: string | null;
  days: number | null;
  cast: string | null;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<Filters>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      date: [''],
      days: [3],
      cast: ['']
    });
  }

  onSearch(): void {
    this.filtersChanged.emit(this.filterForm.value as Filters);
  }

  onReset(): void {
    this.filterForm.reset({
      date: '',
      days: 3,
      cast: ''
    });
    this.filtersChanged.emit(this.filterForm.value as Filters);
  }

  get isDaysFilterVisible(): boolean {
    return !!this.filterForm.value.date;
  }
}