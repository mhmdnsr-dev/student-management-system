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
    this.Students.next([student, ...this.Students.value]);
  }

  deleteStudent(id: number) {
    this.Students.next([...this.Students.value.filter(s => s.ID !== id)]);
  }

  editStudent(student: Student) {
    
    this.Students.next([
      ...this.Students.value.map(s => {
        if (s.ID === student.ID) return student;
        return s;
      }),
    ]);
  }
}
