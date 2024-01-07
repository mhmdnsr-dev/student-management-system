import { Component } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from '../../features/student-list/student-list.component';
import { StudentsService } from '../../services/students.service';
import { HttpService } from '../../services/http.service';
import studentIsMatch from '../../../utils/studentIsMatch';

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
    } catch (error) {
      const err = error as Error;
      this.errMsg = err.message as string;
    } finally {
      this.loading = false;
    }

    const subscription = this.route.queryParamMap.subscribe({
      next: params => {
        const query = params.get('q');

        if (query) {
          this.query = query?.toLowerCase();
          this.students = this.studentsService.studentsValue.filter(s => {
            return studentIsMatch(s, this.query, params);
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
