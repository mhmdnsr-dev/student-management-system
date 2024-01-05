import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FULLNAME, PASSWORD, USERNAME } from '../../../utils/patterns';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';
import {
  nameControl,
  passwordControl,
  rePasswordControl,
  usernameControl,
} from '../../../utils/form-controls';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  controls: _FormControl[] = [
    nameControl,
    usernameControl,
    passwordControl,
    rePasswordControl,
  ];

  loading = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

  
  submit(form: FormGroup) {
    this.loading = true;
    const { Name, Username, Password } = form.value;
    this.httpClient
      .post<ApiResponse>(`${environment.apiUrl}/User/Post`, {
        Name,
        Username,
        Password,
      })
      .subscribe({
        next: v => {
          if (v.Success) this.router.navigate(['/login']);
          else {
            this.loading = false;
            form.setErrors({ errRes: v.Message });
          }
        },
        error: err => {
          this.loading = false;
          form.setErrors({
            errRes: 'Sorry, something went wrong  😥',
          });
        },
      });
  }
}
