import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-pass',
  standalone: true,
  imports: [],
  templateUrl: './toggle-pass.component.html',
  styleUrl: './toggle-pass.component.css',
})
export class TogglePassComponent {
  showPassword = false;

  toggleShowPass(e: MouseEvent) {
    const target = e.target as HTMLElement;

    const targetInput = target.closest('div')?.querySelector('input');

     this.showPassword = !this.showPassword;
   

    const attr = targetInput?.getAttribute('type');

    if (attr === 'password') targetInput?.setAttribute('type', 'text');
    else targetInput?.setAttribute('type', 'password');
  }
}
