import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { iusuario } from 'src/app/models/usuario';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listUsuarios: iusuario[];
  displayModal: boolean;
  titulo: string;
  public formUsuario: FormGroup;
  id: number;
  constructor(private _servicio: ServicioService, private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarTodosUsuarios();
    this.buildForm();
  }
  private buildForm() {
    this.formUsuario = this.formBuilder.group({
      IDUsuario: [null],
      Nombres: ["", Validators.required],
      Apellidos: [null, Validators.required],
      Correo: [null, [Validators.required, Validators.email]],
      Contrasena: []
    });
  }
  showModalDialog() {
    this.displayModal = true;
  }
  setId(id: number) {
    this.id = id;
  }
  listarTodosUsuarios() {
    this._servicio.listarUsuarios().subscribe((resp: any) => {
      if (resp.length > 0) {
        this.listUsuarios = resp;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${resp.mensaje}` });
      }

    })
  }
  confirm(event: Event) {
    if (event.target != null) {
      this.confirmationService.confirm({
        target: event.target,
        message: 'Esta seguro de eliminar?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Si",
        accept: () => {
          this.eliminarUsuario();
        },
        reject: () => {
          //reject action
        }
      });
    }
  }
  eliminarUsuario() {
    this._servicio.eliminarUsuario(this.id).subscribe((resp: any) => {
      console.log(resp);

      if (resp) {
        this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
        this.listarTodosUsuarios();
      }
    })
  }
  setUsuario(usuario?: iusuario) {
    if (usuario) {
      this.titulo = "Editar"
      this.formUsuario.setValue({
        IDUsuario: usuario.IDUsuario,
        Nombres: usuario.Nombres,
        Apellidos: usuario.Apellidos,
        Correo: usuario.Correo,
        Contrasena: ""
      })
    } else {
      this.titulo = "Crear"
      this.buildForm();

    }
  }
  guardar() {
    if (this.formUsuario.valid) {
      if (this.formUsuario.controls['IDUsuario'].value == null) {
        this._servicio.crearUsuario(this.formUsuario.value).subscribe((resp: any) => {
          if (resp) {
            this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
            this.listarTodosUsuarios();
          }
        })
      } else {
        this._servicio.editUsuario(this.formUsuario.value).subscribe((resp: any) => {
          if (resp) {
            this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
            this.listarTodosUsuarios();
          }
        })
      }
    }
  }
}


