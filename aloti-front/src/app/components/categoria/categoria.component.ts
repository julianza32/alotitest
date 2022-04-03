import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { iCategoria } from 'src/app/models/categoria';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  listCategoria: iCategoria[];
  id: number;
  formCategoria: FormGroup;
  titulo: string;
  displayModal: boolean;
  constructor(private _servicio: ServicioService, private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarTodasCategorias();
    this.buildForm();
  }
  listarTodasCategorias() {
    this._servicio.listarCategotias().subscribe((resp: any) => {
      if (resp.length > 0) {
        this.listCategoria = resp;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${resp.mensaje}` });
      }
    })
  }
  setCategoria(categoria?: iCategoria) {
    if (categoria) {
      this.titulo = "Editar"
      this.formCategoria.setValue({
        IDCategoria: categoria.IDCategoria,
        Nombre: categoria.Nombre,
        Descripcion: categoria.Descripcion
      })
    } else {
      this.titulo = "Crear"
      this.buildForm();

    }
  }
  showModalDialog() {
    this.displayModal = true;
  }
  setId(id: number) {
    this.id = id;
  }
  private buildForm() {
    this.formCategoria = this.formBuilder.group({
      IDCategoria: [null],
      Nombre: ["", Validators.required],
      Descripcion: [null, Validators.required]
    });
  }

  confirm(event: Event) {
    if (event.target != null) {
      this.confirmationService.confirm({
        target: event.target,
        message: 'Esta seguro de eliminar?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Si",
        accept: () => {
          this.eliminarProd();
        },
        reject: () => {
          //reject action
        }
      });
    }
  }
  eliminarProd() {
    this._servicio.eliminarCat(this.id).subscribe((resp: any) => {
      if (resp) {
        this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
        this.listarTodasCategorias();
      }
    })
  }
  guardar() {
    if (this.formCategoria.valid) {
      if (this.formCategoria.controls['IDCategoria'].value == null) {
        this._servicio.crearCat(this.formCategoria.value).subscribe((resp: any) => {
          if (resp) {
            this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
            this.listarTodasCategorias();
          }
        })
      } else {
        this._servicio.editCat(this.formCategoria.value).subscribe((resp: any) => {
          if (resp) {
            this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
            this.listarTodasCategorias();
          }
        })
      }
    }
  }
}
