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
      email: [null, [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        cep: [null, Validators.required],
        number: [null, Validators.required],
        complement: [null],
        street: [null, Validators.required],
        neighborhood: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required]
      })
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
    if (email.errors) return email.errors['email'] && email.touched;
  }

  consultCEP() {

    let cep = this.form.get('address.cep').value;

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {

      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.resetAddressField();

        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe(addressData => this.pathAddressData(addressData));
      }
    }
  }

  private resetAddressField() {
    this.form.patchValue({
      address: {
        street: null,
        complement: null,
        neighborhood: null,
        city: null,
        state: null
      }
    });
  }

  private pathAddressData(addressData: any) {
    this.form.patchValue({
      address: {
        street: addressData.logradouro,
        complement: addressData.complemento,
        neighborhood: addressData.bairro,
        city: addressData.localidade,
        state: addressData.uf
      }
    });
  }
}
