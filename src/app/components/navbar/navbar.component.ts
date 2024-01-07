import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
import { SearchComponent } from '../../student-search/search.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, SpinnerComponent, FormsModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  userAuth!: Auth;
  loading = false;
  subscriptions: Subscription[] = [];

  search!: string;
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) {
    const subscription = this.authService.subscribe({
      next: v => {
        this.userAuth = v;
      },
    });

    this.subscriptions.push(subscription);
  }

  async logout() {
    this.loading = true;
    await this.httpService.logout();
    this.loading = false;
  }

  submitSearch(keyword: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        q: keyword || '',
      },
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
