import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rayon } from '../models/rayon';

@Injectable({
  providedIn: 'root'
})
export class RayonService {
  rayons: Rayon[] | undefined;
  private apiUrl="http://localhost:8081/SpringMVC/servlet"

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
    }

  getAllRayon(): Observable<Rayon[]> {
    return this._http.get<Rayon[]>(this.apiUrl + '/getAllRayons');
  }

  getRayonById(id: number): Observable<Rayon> {
    return this._http.get<Rayon>(this.apiUrl + '/getRayon/' + id);
  }

  addRayon(rayon: Rayon): Observable<Rayon> {
    return this._http.post<Rayon>(this.apiUrl + '/addRayon', rayon, this.httpOptions);
  }

  updateRayon(rayon: Rayon): Observable<Rayon> {
    return this._http.put<Rayon>(this.apiUrl + '/updateRayon', rayon);
  }

  deleteRayon(id: number): Observable<Rayon> {
    return this._http.delete<Rayon>(this.apiUrl + '/deleteRayon/'+ id);
  }
}
