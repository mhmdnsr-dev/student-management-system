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

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [SpinnerComponent, FormComponent],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css',
})
export class StudentEditComponent {
  student!: Student;
  loading = false;
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
      const data = (await this.httpService.getEditableStudent(
        this.id
      )) as Student;

      this.editStudentControls = [
        { ...firstNameControl, initianlValue: data.FirstName },
        { ...lastNameControl, initianlValue: data.LastName },
        { ...mobileControl, initianlValue: data.Mobile },
        { ...emailControl, initianlValue: data.Email },
        { ...nationalIDControl, initianlValue: data.NationalID },
        { ...ageControl, initianlValue: data.Age },
      ];

      this.loading = false;
    } catch (error) {
      //TODO: Errors Handling
    }
  }

  async submit(form: FormGroup) {
    console.log(form, 'from submit edit');

    const student: Student = {
      ...form.value,
      ID: this.id,
      NameArabic: 'null',
      NameEnglish: `${form.value.FirstName} ${form.value.LastName}`,
      Age: +form.value.Age,
    };
    console.log(student);

    this.submitLoading = true;
    try {
      const data = await this.httpService.editStudent(student);

      console.log(data, 'edit request');
      if (data.Success) {
        this.router.navigate(['home']);
      } else {
        form.setErrors({ errRes: data.Message });
      }
      this.submitLoading = false;
    } catch (error) {
      //TODO: Errors Handling
    }
  }
}
