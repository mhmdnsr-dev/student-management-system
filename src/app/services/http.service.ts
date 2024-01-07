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

  async login(form: FormGroup) {
    let errMsg = 'Sorry! An error occurred while trying to login';
    const { Username, Password } = form.value;
    try {
      const v = await firstValueFrom(
        this.httpClient.post<ApiResponse>(`${environment.apiUrl}/User/Login`, {
          Username,
          Password,
        })
      );
      if (v.Success) this.authService.login(v.Data as string);
      else {
        errMsg = v.Message;
        throw '';
      }
    } catch (error) {
      throw new Error(errMsg);
    }
  }

  async logout() {
    let errMsg = 'Sorry! An error occurred while trying to logout';
    try {
      const v = await firstValueFrom(
        this.httpClient.post<ApiResponse>(
          `${environment.apiUrl}/User/Logout`,
          null
        )
      );
      if (v.Success) this.authService.logout();
      else {
        errMsg = v.Message;
        throw '';
      }
    } catch (error) {
      throw new Error(errMsg);
    }
  }

  async getStudents() {
    let errMsg = 'Sorry! An error occurred while trying to get students';
    try {
      const v = await firstValueFrom(
        this.httpClient.get<ApiResponse>(`${environment.apiUrl}/Student/Get`)
      );
      if (v.Success) {
        this.studentsService.students = v.Data as Student[];
      } else {
        errMsg = v.Message;
        throw '';
      }
    } catch (error) {
      throw new Error(errMsg);
    }
  }

  async delStudent(id: number) {
    let errMsg = 'Sorry! An error occurred while trying to delete student';
    try {
      const v = await firstValueFrom(
        this.httpClient.delete<ApiResponse>(
          `${environment.apiUrl}/Student/Delete?id=${id}`
        )
      );
      if (v.Success) {
        this.studentsService.deleteStudent(id);
      } else {
        errMsg = v.Message;
        throw '';
      }
    } catch (error) {
      throw new Error(errMsg);
    }
  }

  async getEditableStudent(id: number) {
    let errMsg = 'Sorry! An error occurred while trying to get student info';
    try {
      const v = await firstValueFrom(
        this.httpClient.get<ApiResponse>(
          `${environment.apiUrl}/Student/GetEditableByID?id=${id}`
        )
      );
      if (v.Success) return v;
      else {
        errMsg = v.Message;
        throw '';
      }
    } catch (error) {
      throw new Error(errMsg);
    }
  }

  async editStudent(student: Student) {
    let errMsg = 'Sorry! An error occurred while trying to get student info';
    try {
      const v = await firstValueFrom(
        this.httpClient.put<ApiResponse>(
          `${environment.apiUrl}/Student/PUT`,
          student
        )
      );
      if (v.Success)
        if (v.Success) this.studentsService.editStudent(student);
        else {
          errMsg = v.Message;
          throw '';
        }
    } catch (error) {
      throw new Error(errMsg);
    }
  }

  async createStudent(form: FormGroup) {
    let errMsg = 'Sorry! An error occurred while trying to create new student';
    try {
      const v = await firstValueFrom(
        this.httpClient.post<ApiResponse>(
          `${environment.apiUrl}/Student/POST`,
          form.value
        )
      );
      if (v.Success) {
        const student: Student = {
          Name: `${form.value['FirstName']} ${form.value['LastName']}`,
          Mobile: form.value['Mobile'],
          Email: form.value['Email'],
          Age: form.value['Age'],
          ID: v.Data as number,
          NationalID: form.value['NationalID'],
        };
        this.studentsService.createStudent(student);
      } else {
        errMsg = v.Message;
        throw '';
      }
    } catch (error) {
      throw new Error(errMsg);
    }
  }
}
