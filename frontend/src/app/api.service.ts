import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable'
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers:HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  ip : string = 'http://localhost:5000';

  constructor(private http : HttpClient) { }

  public ingresarReporte(data : any) : Observable<any> {
    return this.http.post(`${this.ip}/reports`,data);
  }

  public obtenerReporte(): Observable<any>{
    
    return this.http.get(`${this.ip}/reports`);
  }

}
 