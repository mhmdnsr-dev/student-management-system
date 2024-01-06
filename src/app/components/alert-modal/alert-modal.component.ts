import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [],
  templateUrl: './alert-modal.component.html',
})
export class AlertModalComponent {
  @Input() message!: string;
  @Input() actionText!: string;
  @Input() modalTitle!: string;
  @Input() modalId!: string;
  @Input() btnShape!: string;

  @Output() modalConfirmed = new EventEmitter();

  modalConfirm(e: MouseEvent) {
    this.modalConfirmed.emit();
  }
}
