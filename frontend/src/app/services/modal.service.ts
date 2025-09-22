import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalState {
  isOpen: boolean;
  operaName: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<ModalState>({isOpen: false, operaName: '', description: ''});
  modalState$ = this.modalState.asObservable();

  openModal(operaName: string, description: string): void {
    this.modalState.next({isOpen: true, operaName, description});
  }

  closeModal(): void {
    this.modalState.next({isOpen: false, operaName: '', description: ''});
  }
}