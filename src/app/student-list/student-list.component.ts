import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { StudentsService } from '../services/students.service';
import { Subscription } from 'rxjs';
import { StudentCardComponent } from '../components/student-card/student-card.component';
import { SpinnerComponent } from '../components/ui/spinner/spinner.component';
import { ModalComponent } from '../components/modal/modal.component';
import {
  emailControl,
  firstNameControl,
  lastNameControl,
  mobileControl,
} from '../../utils/form-controls';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [StudentCardComponent, SpinnerComponent, ModalComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  students: Student[] = [];
  subscriptions: Subscription[] = [];
  loading = false;
  createStudentControls: _FormControl[] = [
    firstNameControl,
    lastNameControl,
    emailControl,
    mobileControl,
    {
      name: 'NationalID',
      pattern: {
        msg: 'The national ID must be 14 numbers',
        value: /^[1-9]{14}$/,
      },
      placeHolder: 'NationalID',
    },
    {
      name: 'Age',
      pattern: {
        msg: 'Must be over 17 years old',
        value: /^(1[89]|[2-9]\d)$/,
      },
      placeHolder: 'Age',
      type: 'number',
    },
  ];

  constructor(
    private http: HttpService,
    private studentsService: StudentsService
  ) {}

  async ngOnInit() {
    if (!this.students.length) {
      this.loading = true;

      await this.http.getStudents();

      const subscription = this.studentsService.studentsSubscribe({
        next: v => (this.students = v),
      });

      this.subscriptions.push(subscription);

      this.loading = false;
    }
  }

  createStudent(e?: FormGroup) {
    if (e) console.log(e, 'from student list');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
