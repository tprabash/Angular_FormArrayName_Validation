import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  companyForm: FormGroup;
  isSubmitted: boolean;
  phoneRegex: RegExp = /^((3[0-9])|(6[0-9])|(8[1-9])|(9[0-8]))[0-9]{6}$/;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.companyForm = this.formBuilder.group({
      contacts: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', Validators.required],
          phone: [
            '',
            [Validators.required, Validators.pattern(this.phoneRegex)],
          ],
        }),
      ]),
    });
  }

  onSubmit() {
    this.isSubmitted = true;
  }

  // add new form group to contacts array
  addContactField() {
    let control = <FormArray>this.companyForm.controls.contacts;
    control.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
      })
    );
  }

  get contacts() {
    return this.companyForm.get('contacts') as FormArray;
  }
}
