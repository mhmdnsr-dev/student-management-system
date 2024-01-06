import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  userAuth!: Auth;

  subscriptions: Subscription[] = [];
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    const subscription = this.authService.subscribe({
      next: v => {
        this.userAuth = v;
      },
    });

    this.subscriptions.push(subscription);
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
