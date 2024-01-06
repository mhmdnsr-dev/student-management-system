import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor() {}

  private Students = new BehaviorSubject<Student[]>([]);

  get studentsValue() {
    return this.Students.getValue();
  }

  get studentsSubscribe() {
    return this.Students.subscribe.bind(this.Students);
  }

  set students(student: Student[]) {
    this.Students.next(student);
  }

  createStudent(student: Student) {
    this.Students.next([student, ...this.studentsValue]);
  }

  deleteStudent(id: number) {
    this.Students.next([...this.Students.value.filter(s => s.ID !== id)]);
  }
}
