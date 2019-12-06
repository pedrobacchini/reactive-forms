import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    /*this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null)
    });*/

    this.form = this.formBuilder.group({
      nome : [null],
      email : [null]
    });
  }

}
