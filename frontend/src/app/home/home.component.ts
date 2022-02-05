import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import {ProductoComponent} from '../producto/producto.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  modalRef: MDBModalRef;

  public historialReportes = [];
  public carnetR = '';
  private strReporte = {
    carnet : '',
    nombre : '',
    curso : '',
    body : ''
  }



  constructor(private apiService : ApiService,  private modalService: MDBModalService) { 
  }

  ngOnInit(): void {
    this.obtenerReportes();
  }

  carnet(event: any) {
    this.strReporte.carnet = event.target.value;
  }

  carnetRep(event: any) {
    this.carnetR = event.target.value;
  }

  nombre(event: any) {
    this.strReporte.nombre = event.target.value;
  }

  curso(event: any) {
    this.strReporte.curso = event.target.value;
  }

  cuerpo(event: any) {
    this.strReporte.body = event.target.value;
  }

  ingresarReporte(){
    let reporte = {
      carnet : this.strReporte.carnet,
      nombre : this.strReporte.nombre,
      curso : this.strReporte.curso,
      mensaje : this.strReporte.body
    }
    this.apiService.ingresarReporte(reporte).subscribe(
      (data)=>{
        console.log(data);
        if(data.status){
          alert(data.msg);
          this.obtenerReportes();
        }
        else{
          alert(data.message);
        }
      },
      (err)=>{
        console.error(err);
      }
    )
  }

  obtenerReportes(){
    this.apiService.obtenerReporte().subscribe(
      (data)=>{
        console.log(data);
        this.historialReportes = data;
        if(this.carnetR != "") {
          this.historialReportes = this.historialReportes.filter(carnet => carnet.carnet == this.carnetR);
        }
        
      },
      (err)=>{
        console.error(err);
      }
    )
  }
  openProducto(producto) {
    let producto_string = JSON.stringify(producto);
    localStorage.setItem('producto', producto_string);
    this.modalRef = this.modalService.show(ProductoComponent)
  }
}
