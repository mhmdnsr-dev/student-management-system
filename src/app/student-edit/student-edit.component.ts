import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerComponent } from '../components/ui/spinner/spinner.component';
import {
  ageControl,
  emailControl,
  firstNameControl,
  lastNameControl,
  mobileControl,
  nationalIDControl,
} from '../../utils/form-controls';
import { FormComponent } from '../components/form/form.component';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [SpinnerComponent, FormComponent, CommonModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css',
})
export class StudentEditComponent {
  student!: Student;
  loading = false;
  errMsg!: string;
  submitLoading = false;
  id: number;
  editStudentControls!: _FormControl[];

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.params['id'];
  }

  async ngOnInit() {
    try {
      this.loading = true;
      const data = await this.httpService.getEditableStudent(this.id);
      if (data.Data) {
        const student = data.Data as Student;
        this.editStudentControls = [
          { ...firstNameControl, initianlValue: student.FirstName },
          { ...lastNameControl, initianlValue: student.LastName },
          { ...mobileControl, initianlValue: student.Mobile },
          { ...emailControl, initianlValue: student.Email },
          { ...nationalIDControl, initianlValue: student.NationalID },
          { ...ageControl, initianlValue: student.Age },
        ];
      } else {
        this.router.navigate(['not-found']);
      }
    } catch (error) {
      const err = error as Error;
      this.errMsg = err.message;
    } finally {
      this.loading = false;
    }
  }

  async submit(form: FormGroup) {
    try {
      const student: Student = {
        ...form.value,
        ID: this.id,
        NameArabic: 'null',
        NameEnglish: `${form.value.FirstName} ${form.value.LastName}`,
        Age: +form.value.Age,
      };
      this.submitLoading = true;
      await this.httpService.editStudent(student);
      this.router.navigate(['home']);
    } catch (error) {
      const err = error as Error;
      form.setErrors({ errRes: err.message });
    } finally {
      this.submitLoading = false;
    }
  }
}
