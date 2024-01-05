import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  // templateUrl: './spinner.component.html',
  template: ` <button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Loading...</span>
  </button>`,
})
export class SpinnerComponent {}
