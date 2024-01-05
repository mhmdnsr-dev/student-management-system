import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FULLNAME, PASSWORD, USERNAME } from '../../../utils/patterns';
import { passwordMatching } from '../../../utils/validators';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SpinnerComponent } from '../../components/ui/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, SpinnerComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  showPass = false;
  showRePass = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  form = this.formBuilder.group(
    {
      Name: ['', Validators.pattern(FULLNAME)],
      Username: ['', Validators.pattern(USERNAME)],
      Password: ['', Validators.pattern(PASSWORD)],
      rePassword: ['', Validators.pattern(PASSWORD)],
    },
    {
      validators: passwordMatching,
    }
  );

  submit() {
    this.loading = true;

    const { Name, Username, Password } = this.form.value;

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
            this.form.setErrors({ errRes: v.Message });
          }
        },
        error: err => {
          this.loading = false;
          this.form.setErrors({
            errRes: 'Sorry, something went wrong  😥',
          });
        },
      });
  }

  toggleShowPass(e: MouseEvent) {
    const target = e.target as HTMLElement;

    const targetInput = target.closest('div')?.querySelector('input');

    if (targetInput?.name === 'Password') this.showPass = !this.showPass;
    else this.showRePass = !this.showRePass;

    const attr = targetInput?.getAttribute('type');

    if (attr === 'password') targetInput?.setAttribute('type', 'text');
    else targetInput?.setAttribute('type', 'password');
  }
}
