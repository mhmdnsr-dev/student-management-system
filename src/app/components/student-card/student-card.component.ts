import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css',
})
export class StudentCardComponent {
  @Input() student!: Student;

  constructor(private router: Router) {}

  edit(student: Student) {
    this.router.navigate(['student/edit/' + student.ID]);
  }
}
