import { Component } from '@angular/core';
import { StudentListComponent } from '../student-list/student-list.component';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [StudentListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  students: Student[] = [];
  loading = false;
  subscriptions: Subscription[] = [];
  timer!: any;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private httpService: HttpService
  ) {
    const subscription = this.studentsService.studentsSubscribe({
      next: v => (this.students = v),
    });
    this.subscriptions.push(subscription);
  }

  async ngOnInit() {
    this.loading = true;
    await this.httpService.getStudents();
    this.loading = false;

    this.route.queryParams.subscribe({
      next: param => {
        const query: string = param['q']?.toLowerCase();
        this.students = this.studentsService.studentsValue.filter(s => {
          return this.search(s, query);
        });
      },
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  filterBy(e: Event) {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      const targetEl = e.target as HTMLInputElement;
      const keyword = targetEl.value.toLowerCase();
      const by = targetEl.name as keyof Student;

      this.students = this.studentsService.studentsValue.filter(s => {
        return this.search(s, keyword, by);
      });
    }, 600);
  }

  search(student: Student, keyword: string, by?: keyof Student) {
    if (by === 'Age') return student['Age'] === +keyword;
    if (by) return student[by]?.toString().toLowerCase().includes(keyword);

    return (
      student.Age === +keyword ||
      student.Email.toLowerCase().includes(keyword) ||
      student.Mobile.toLowerCase().includes(keyword) ||
      student.Name.toLowerCase().includes(keyword) ||
      student.NationalID.toLowerCase().includes(keyword)
    );
  }
}
