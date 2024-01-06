import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StudentsService } from './students.service';
import { firstValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';

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

  async createStudent(form: FormGroup) {
    const v = await firstValueFrom(
      this.httpClient.post<ApiResponse>(
        `${environment.apiUrl}/Student/POST`,
        form.value
      )
    );
    console.log(v, 'from createStudent request');

    if (v.Success && typeof v.Data === 'number') {
      const student: Student = {
        Name: `${form.value['FirstName']} ${form.value['LastName']}`,
        Mobile: form.value['Mobile'],
        Email: form.value['Email'],
        Age: form.value['Age'],
        ID: v.Data,
        NationalID: form.value['NationalID'],
      };

      console.log(student, 'student created');
      form.reset();
      this.studentsService.createStudent(student);
    } else {
      //TODO: Handling err
      if (v.Message === 'Sorry already exists.')
        form.setErrors({ errRes: v.Message });
    }
  }
}
