import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { passwordControl, usernameControl } from '../../../utils/form-controls';
import { HttpService } from '../../services/http.service';

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

  constructor(private httpService: HttpService) {}

  async submit(form: FormGroup) {
    try {
      this.loading = true;
      await this.httpService.login(form);
    } catch (error) {
      const err = error as Error;
      form.setErrors({
        errRes: err.message,
      });
    } finally {
      this.loading = false;
    }
  }
}
