import { Component, Input, Output } from '@angular/core';
import { StudentCardComponent } from '../components/student-card/student-card.component';
import { SpinnerComponent } from '../components/ui/spinner/spinner.component';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [StudentCardComponent, SpinnerComponent, ModalComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  @Input() students!: Student[] | undefined;
  @Input() loading = false;
}
