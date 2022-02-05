import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto:any;

  constructor(private apiService : ApiService, public modalRef: MDBModalRef, private router: Router) { 
    this.cargarProducto();
  }

  ngOnInit(): void {
    
  }

  cargarProducto()
  {
    let producto_string = localStorage.getItem('producto');
    let producto = JSON.parse(producto_string);
    this.producto = producto;
    console.log(this.producto);
  }

}
