import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { passwordControl, usernameControl } from '../../../utils/form-controls';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  controls: _FormControl[] = [usernameControl, passwordControl];

  loading = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  submit(form: FormGroup) {
    this.loading = true;

    const { Username, Password } = form.value;

    this.httpClient
      .post<ApiResponse>(`${environment.apiUrl}/User/Login`, {
        Username,
        Password,
      })
      .subscribe({
        next: v => {
          if (v.Success && typeof v.Data === 'string')
            this.authService.login(v.Data);
          else {
            this.loading = false;
            let err = v.Message;
            v.Message === 'invalid user' &&
              (err = 'Incorrect username or password');
            form.setErrors({ errRes: err });
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
