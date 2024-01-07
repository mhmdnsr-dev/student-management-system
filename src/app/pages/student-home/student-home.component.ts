import { Component } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { HttpService } from '../../services/http.service';
import { StudentsService } from '../../services/students.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from '../../features/student-list/student-list.component';
import { StudentCreateComponent } from '../../features/student-create/student-create.component';

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
    } catch (error) {
      const err = error as Error;
      this.errMsg = err.message as string;
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
