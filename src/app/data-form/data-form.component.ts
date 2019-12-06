import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
    /*this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null)
    });*/

    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log(this.form.value);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .subscribe(() => this.form.reset(), (error: any) => alert(error));
  }
}
