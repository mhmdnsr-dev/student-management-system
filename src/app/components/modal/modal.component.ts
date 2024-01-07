import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @Input() message!: string;
  @Input() actionText!: string;
  @Input() modalTitle!: string;
  @Input() modalId!: string;
  @Input() btnShape!: string;
  @Input() formControls!: _FormControl[];
  loading = false;

  @Output() modalConfirmed = new EventEmitter();

  async modalConfirm(form?: FormGroup) {
    this.modalConfirmed.emit();

    if (form) {
      try {
        this.loading = true;
        await this.httpService.createStudent(form);

        this.closeBtn.nativeElement.click();
      } catch (error) {
        const err = error as Error;
        form.setErrors({ errRes: err.message });
      } finally {
        this.loading = false;
      }
    }
  }
}
