import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ModalComponent } from '../modal/modal.component';
import { SpinnerComponent } from '../ui/spinner/spinner.component';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [ModalComponent, SpinnerComponent],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css',
})
export class StudentCardComponent {
  @Input() student!: Student;
  loading = false;
  errMsg!: string;

  constructor(private router: Router, private httpService: HttpService) {}

  edit() {
    this.router.navigate(['student/edit/' + this.student.ID]);
  }

  async del() {
    try {
      this.loading = true;
      await this.httpService.delStudent(this.student.ID);
    } catch (error) {
      const err = error as Error;
      this.errMsg = err.message;
    } finally {
      this.loading = false;
    }
  }
}
