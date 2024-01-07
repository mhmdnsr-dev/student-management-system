import { Component } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { HttpService } from '../services/http.service';
import { StudentsService } from '../services/students.service';
import { Subscription } from 'rxjs';
import { StudentCreateComponent } from '../student-create/student-create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [
    ModalComponent,
    StudentListComponent,
    StudentCreateComponent,
    CommonModule,
  ],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css',
})
export class StudentHomeComponent {
  students: Student[] = [];
  loading = false;
  subscriptions: Subscription[] = [];
  errMsg!: string;

  constructor(
    private httpService: HttpService,
    private studentsService: StudentsService
  ) {
    const subscription = this.studentsService.studentsSubscribe({
      next: v => (this.students = v),
    });
    this.subscriptions.push(subscription);
  }

  async ngOnInit() {
    try {
      this.loading = true;
      await this.httpService.getStudents();
      this.loading = false;
    } catch (error) {
      const err = error as Error;
      this.errMsg = err.message as string;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
