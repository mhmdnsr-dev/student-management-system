import { Component } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import {
  ageControl,
  emailControl,
  firstNameControl,
  lastNameControl,
  mobileControl,
  nationalIDControl,
} from '../../../utils/form-controls';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css',
})
export class StudentCreateComponent {
  createStudentControls: _FormControl[] = [
    firstNameControl,
    lastNameControl,
    emailControl,
    mobileControl,
    nationalIDControl,
    ageControl,
  ];
}
