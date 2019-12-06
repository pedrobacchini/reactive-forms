import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .subscribe(() => this.form.reset(), (error: any) => alert(error));
  }

  applyCssError(field: string) {
    return {
      'has-error': this.checkValidTouched(field),
      'has-feedback': this.checkValidTouched(field)
    };
  }

  checkValidTouched(field: string): boolean {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  checkValidEmail(): boolean {
    const email = this.form.get('email');
    if (email.errors) {
      return email.errors['email'] && email.touched;
    }
  }
}
