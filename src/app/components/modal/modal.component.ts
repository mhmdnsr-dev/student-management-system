import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  constructor(private httpService: HttpService) {}
  @Input() message!: string;
  @Input() actionText!: string;
  @Input() modalTitle!: string;
  @Input() modalId!: string;
  @Input() btnShape!: string;
  @Input() formControls!: _FormControl[];
  loading = false;

  @Output() modalConfirmed = new EventEmitter<FormGroup | undefined>();

  async modalConfirm(form?: FormGroup) {
    this.modalConfirmed.emit(form);

    if (form) {
      this.loading = true;
      await this.httpService.createStudent(form);
      this.loading = false;
    }
  }
}
