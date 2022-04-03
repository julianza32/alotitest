import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login: FormGroup;

  constructor(private _router:Router, private formBuilder: FormBuilder, private _login: ServicioService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.buildForm();

  }
  private buildForm() {
    this.login = this.formBuilder.group({
      Correo: ['', [Validators.email, Validators.required]],
      Contrasena: ['', [Validators.required]]
    });
  }
  iniciarSe() {
    if (this.login.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Formulario invalido' });
    } else {
      this._login.login(this.login.value).subscribe((resp: any) => {
        if (resp.user) {
          localStorage.setItem('token',resp.token);
this._router.navigate(['dashboard'])
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${resp.mensaje}` });

        }
      }), (err: any) => {
        console.log(err);
      }
    }
  }
}
