import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StudentsService } from './students.service';
import { firstValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private studentsService: StudentsService,
    private authService: AuthService
  ) {}

  async logout() {
    const v = await firstValueFrom(
      this.httpClient.post<ApiResponse>(
        `${environment.apiUrl}/User/Logout`,
        null
      )
    );
    if (v.Success) {
      this.authService.logout();
    }
    return v;
  }
  async getStudents() {
    const v = await firstValueFrom(
      this.httpClient.get<ApiResponse>(`${environment.apiUrl}/Student/Get`)
    );
    if (v.Success) this.studentsService.students = v.Data as Student[];
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

  async getEditableStudent(id: number) {
    const v = await firstValueFrom(
      this.httpClient.get<ApiResponse>(
        `${environment.apiUrl}/Student/GetEditableByID?id=${id}`
      )
    );

    return v;
    // else {
    //   throw new Error(v.Message);
    // }
  }

  async editStudent(student: Student) {
    const v = await firstValueFrom(
      this.httpClient.put<ApiResponse>(
        `${environment.apiUrl}/Student/PUT`,
        student
      )
    );

    if (v.Success) this.studentsService.editStudent(student);
    else {
      // throw new Error(v.Message);
    }
    return v;
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
