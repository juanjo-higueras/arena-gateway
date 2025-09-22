import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService, ModalState } from '../../services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-opera-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opera-modal.component.html',
  styleUrl: './opera-modal.component.css'
})
export class OperaModalComponent {
  modalService = inject(ModalService);
  modalState$: Observable<ModalState> = this.modalService.modalState$;

  close(): void {
    this.modalService.closeModal();
  }
}