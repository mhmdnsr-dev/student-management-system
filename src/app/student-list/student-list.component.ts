import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { StudentsService } from '../services/students.service';
import { Subscription } from 'rxjs';
import { StudentCardComponent } from '../components/student-card/student-card.component';
import { SpinnerComponent } from '../components/ui/spinner/spinner.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [StudentCardComponent, SpinnerComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  students: Student[] = [];
  subscriptions: Subscription[] = [];
  loading = false;

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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
