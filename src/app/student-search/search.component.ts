import { Component } from '@angular/core';
import { StudentListComponent } from '../student-list/student-list.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [StudentListComponent, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  students: Student[] = [];
  loading = false;
  subscriptions: Subscription[] = [];
  query!: string;
  errMsg!: string;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private httpService: HttpService,
    private router: Router
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

    const subscription = this.route.queryParamMap.subscribe({
      next: params => {
        const query = params.get('q');

        if (query) {
          this.query = query?.toLowerCase();
          this.students = this.studentsService.studentsValue.filter(s => {
            return this.match(s, params);
          });
        } else this.router.navigate(['/home']);
      },
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  // filterBy(e: Event) {
  //   clearTimeout(this.timer);

  //   this.timer = setTimeout(() => {
  //     const targetEl = e.target as HTMLInputElement;
  //     const keyword = targetEl.value.toLowerCase();
  //     const by = targetEl.name as keyof Student;

  //     this.students = this.studentsService.studentsValue.filter(s => {
  //       return this.search(s, keyword, by);
  //     });
  //   }, 600);
  // }

  match(student: Student, params: ParamMap) {
    const studentKeys = ['Name', 'Email', 'Mobile', 'NationalID', 'Age'];
    const filterKeys = params.keys.filter(k => k !== 'q' && params.get(k));
    const queryKeyword = this.query.toLowerCase();

    const isSearchFound = studentKeys.some(key => {
      if (key === 'Age') return student['Age'] === +queryKeyword;
      return student[key as keyof Student]
        ?.toString()
        .toLowerCase()
        .includes(queryKeyword);
    });

    const isFilterFound = filterKeys.every(key => {
      const filterKeyword = params.get(key) as string;
      if (key === 'Age') return student['Age'] === +filterKeyword.toLowerCase();
      return student[key as keyof Student]
        ?.toString()
        .toLowerCase()
        .includes(filterKeyword.toLowerCase());
    });

    return filterKeys.length ? isSearchFound && isFilterFound : isSearchFound;
  }

  submit(form: NgForm) {
    for (const query in form.value) {
      !form.value[query] && delete form.value[query];
    }
    this.router.navigate(['/search'], {
      queryParams: {
        q: this.query,
        ...form.value,
      },
    });
  }
}
