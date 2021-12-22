import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailProduitService {

  private url = 'http://localhost:8081/SpringMVC/servlet';

  constructor(private _http: HttpClient) { }
}
