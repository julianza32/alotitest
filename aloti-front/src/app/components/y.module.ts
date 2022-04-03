import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YRoutingModule } from './y-routing.module';
import { ProductosComponent } from './productos/productos.component';
import {TableModule} from 'primeng/table';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {InputTextareaModule} from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    ProductosComponent,
    CategoriaComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    YRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    InputNumberModule,
    ConfirmPopupModule,
    InputTextareaModule


  ],
  providers: [ConfirmationService]
})
export class YModule { }
