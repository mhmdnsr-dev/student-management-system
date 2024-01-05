import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { PASSWORD, USERNAME } from '../../../utils/patterns';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  controls: _FormControl[] = [
    {
      name: 'Username',
      pattern: {
        value: USERNAME,
        msg: '+3 to 15 alphanumeric string that may include _ and -',
      },
      placeHolder: 'Username',
      required: true,
      type: 'text',
    },
    {
      name: 'Password',
      pattern: {
        value: PASSWORD,
        msg: '8+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special',
      },
      placeHolder: 'Password',
      required: true,
      type: 'password',
    },
  ];
  loading = false;

  constructor(
    private httpClient: HttpClient,
    private authSrvice: AuthService
  ) {}

  submit(e: FormGroup) {
    this.loading = true;

    const { Username, Password } = e.value;

    this.httpClient
      .post<ApiResponse>(`${environment.apiUrl}/User/Login`, {
        Username,
        Password,
      })
      .subscribe({
        next: v => {
          console.log(v);
          if (v.Success && typeof v.Data === 'string') {
            this.authSrvice.login(v.Data);
          } else {
            this.loading = false;
            let err = v.Message;
            if (v.Message === 'invalid user')
              err = 'Incorrect username or password';
            e.setErrors({ errRes: err });
          }
        },
        error: err => {
          this.loading = false;
          e.setErrors({
            errRes: 'Sorry, something went wrong  😥',
          });
        },
      });
  }
}
