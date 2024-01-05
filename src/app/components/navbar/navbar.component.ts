import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  userAuth!: Auth;
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    console.log(this.authService.subscribe);
    this.authService.subscribe({
      next: v => {
        this.userAuth = v;
      },
    });
  }

  logout() {
    this.httpClient
      .post<ApiResponse>(`${environment.apiUrl}/User/Logout`, null)
      .subscribe({
        next: value => {
          console.log(value);
          if (value.Success) this.authService.logout();
          else {
          }
        },
        error(err) {
          console.log(err);
        },
      });
  }
}
