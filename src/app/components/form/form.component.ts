import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatching } from '../../../utils/validators';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
import { TogglePassComponent } from '../toggle-pass/toggle-pass.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TogglePassComponent,
    SpinnerComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() controls!: _FormControl[];

  @Input() submitText: string = 'Submit';

  @Input() loading: boolean = false;

  @Output() formSubmit = new EventEmitter<FormGroup>();

  form: FormGroup = new FormGroup({}, { validators: passwordMatching });

  ngOnInit() {
    this.controls.forEach(c => {
      this.form.addControl(
        c.name,
        new FormControl(
          c.initianlValue || '',
          Validators.pattern(c.pattern.value)
        )
      );
    });
  }

  submit() {
    this.formSubmit.emit(this.form);
  }

  controlIsValid(control: _FormControl) {
    return this.form.controls[control.name].touched
      ? this.form.controls[control.name].invalid ||
        (this.form.errors?.['passwordMismatch'] &&
          control.name === 'rePassword')
        ? 'is-invalid'
        : 'is-valid'
      : '';
  }

  feadback(control: _FormControl) {
    return this.form.controls[control.name].hasError('required')
      ? control.placeHolder + ' is required'
      : this.form.controls[control.name].hasError('pattern')
      ? control.pattern.msg
      : this.form.errors?.['passwordMismatch'] && control.name === 'rePassword'
      ? 'The two passwords must match'
      : '';
  }
}
