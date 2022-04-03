import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { iCategoria } from 'src/app/models/categoria';
import { iproductos } from 'src/app/models/productos';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  listProductos: iproductos[];
  displayModal: boolean;
  titulo: string;
  public formProducto: FormGroup;
  listCategoria: iCategoria[];
  id: number;

  constructor(private _servicio: ServicioService, private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.listarTodosProd();
    this.buildForm();
    this.listarTodasCategorias();

  }

  private buildForm() {
    this.formProducto = this.formBuilder.group({
      IDProducto: [null],
      Nombre: ["", Validators.required],
      IDCategoria: [null, Validators.required],
      Valor: [null, Validators.required]
    });
  }
  listarTodosProd() {
    this._servicio.listarProductos().subscribe((resp: any) => {
      if (resp.length > 0) {
        this.listProductos = resp;
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${resp.mensaje}` });
      }

    })
  }
  showModalDialog() {
    this.displayModal = true;
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
  setProducto(producto?: iproductos) {
    if (producto) {
      this.titulo = "Editar"
      this.formProducto.setValue({
        IDProducto: producto.IDProducto,
        Nombre: producto.Nombre,
        IDCategoria: producto.IDCategoria,
        Valor: producto.Valor
      })
    } else {
      this.titulo = "Crear"
      this.buildForm();

    }
  }
  setId(id: number) {
    this.id = id;
  }



  guardar() {
    if (this.formProducto.valid) {
      if (this.formProducto.controls['IDProducto'].value == null) {
        this._servicio.crearProd(this.formProducto.value).subscribe((resp: any) => {
          if (resp) {
            this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
            this.listarTodosProd();
          }
        })
      } else {
        this._servicio.editarProd(this.formProducto.value).subscribe((resp: any) => {
          if (resp) {
            this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
            this.listarTodosProd();
          }
        })
      }
    }
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
    this._servicio.eliminarProd(this.id).subscribe((resp: any) => {
      if (resp) {
        this.messageService.add({ severity: 'info', detail: `${resp.mensaje}` });
        this.listarTodosProd();
      }
    })
  }
}
