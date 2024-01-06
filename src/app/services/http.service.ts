import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StudentsService } from './students.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private studentsSer: StudentsService
  ) {}

  getStudents() {
    this.httpClient
      .get<ApiResponse>(`${environment.apiUrl}/Student/Get`)
      .subscribe({
        next: v => {
          console.log(v, 'from request');

          if (v.Success && typeof v.Data === 'object')
            this.studentsSer.students = v.Data;
        },
        error: err => {
          console.log(err, 'from request');
        },
      });
  }
}
