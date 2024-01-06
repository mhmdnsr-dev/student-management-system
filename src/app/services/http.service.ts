import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StudentsService } from './students.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private studentsService: StudentsService
  ) {}

  async getStudents() {
    const v = await firstValueFrom(
      this.httpClient.get<ApiResponse>(`${environment.apiUrl}/Student/Get`)
    );
    if (v.Success && typeof v.Data === 'object')
      this.studentsService.students = v.Data;
  }

  async delStudent(id: number) {
    const v = await firstValueFrom(
      this.httpClient.delete<ApiResponse>(
        `${environment.apiUrl}/Student/Delete?id=${id}`
      )
    );

    if (v.Success) this.studentsService.deleteStudent(id);
    else {
      //TODO: Handling err
    }
  }
}
