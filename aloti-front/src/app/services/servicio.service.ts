import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../models/login';
import { iproductos } from '../models/productos';
import { iCategoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {


  private baseURL = "http://localhost:8080"
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  login(data: login) {
    return this.http.post(`${this.baseURL}/login`, data, { headers: this.headers });
  }

  listarProductos() {
    this.setToken();
    return this.http.get(`${this.baseURL}/listartodosprod`, { headers: this.headers });
  }
  listarCategotias() {
    this.setToken();
    return this.http.get(`${this.baseURL}/listartodascat`, { headers: this.headers });
  }
  editarProd(prod: iproductos) {
    this.setToken();
    return this.http.post(`${this.baseURL}/editarprod`, prod, { headers: this.headers });
  }
  crearProd(prod: iproductos) {
    this.setToken();
    return this.http.post(`${this.baseURL}/registrarprod`, prod, { headers: this.headers });
  }
  eliminarProd(id: number) {
    let data = { IDProducto: id }
    this.setToken();
    return this.http.put(`${this.baseURL}/eliminarprod`, data, { headers: this.headers });

  }
  crearCat(cat: iCategoria) {
    this.setToken();
    return this.http.post(`${this.baseURL}/registrarcat`, cat, { headers: this.headers });
  }

  editCat(cat: iCategoria) {
    this.setToken();
    return this.http.post(`${this.baseURL}/editarcat`, cat, { headers: this.headers });
  }
  eliminarCat(id: number) {
    let data = { IDCategoria: id }
    this.setToken();
    return this.http.put(`${this.baseURL}/eliminarcat`, data, { headers: this.headers });

  }
  listarUsuarios() {
    this.setToken();
    return this.http.get(`${this.baseURL}/listartodosusuario`, { headers: this.headers });
  }
  crearUsuario(cat: iCategoria) {
    this.setToken();
    return this.http.post(`${this.baseURL}/registrarusuario`, cat, { headers: this.headers });
  }
  editUsuario(cat: iCategoria) {
    this.setToken();
    return this.http.post(`${this.baseURL}/editarusuario`, cat, { headers: this.headers });
  }
  eliminarUsuario(id: number) {
    let data = { IDUsuario: id }
    this.setToken();
    return this.http.put(`${this.baseURL}/eliminarusuario`, data, { headers: this.headers });
  }


  getToken() {
    if (localStorage.getItem('token') != null) {
      return localStorage.getItem('token');
    }
    return
  }


  setToken() {
    let t = this.getToken();
    if (t != null) {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'tokenclient': `${t}`
      });
    }
  }
}
