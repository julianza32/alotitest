import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
      this.items = [
          {label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: 'usuarios'},
          {label: 'Productos', icon: 'pi pi-fw pi-table', routerLink: 'productos' },
          {label: 'Categoria', icon: 'pi pi-fw pi-tags', routerLink: 'categorias'}
      ];
  }

}
