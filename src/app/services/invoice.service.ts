import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture';
import { DetailFacture } from '../models/detailFacture';
import { ResponseJson } from '../models/ResponseJson';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = 'http://localhost:8081/SpringMVC/servlet';

  constructor(private _http: HttpClient) { }

  findAllFactures(): Promise<Facture[]> {
    return this._http.get(this.url + '/getAllFactures').toPromise().then(response => response as Facture[]).catch(this.handleError);
  }

  findFacture(id: number): Observable<Facture> {
    return this._http.get<Facture>(this.url + '/getFacture/' + id);
  }

  private handleError(error: any): Promise<Array<any>> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  createFacture(facture: Facture): Observable<ResponseJson> {
    return this._http.post<ResponseJson>(this.url + '/addFacture', facture);

  }

  updateFacture(facture: Facture): Observable<Facture> {
    return this._http.put<Facture>(this.url + '/updateFacture', facture);
  }

  deleteFacture(id: number): Observable<Facture> {
    return this._http.delete<Facture>(this.url + '/deleteFacture/' + id);
  }

  addDetailFacture(detailFacture: DetailFacture): Observable<DetailFacture> {
    return this._http.post<DetailFacture>(this.url + '/addDetailFacture', detailFacture);
  }

  findAllDetailFactures(idFacture: number): Observable<DetailFacture[]> {
    return this._http.get<DetailFacture[]>(this.url + '/getDetailFactureByFacture/' + idFacture);
  }

  updateFactureStatus(facture: Facture): Observable<Facture> {
    return this._http.put<Facture>(this.url + '/changeStatus', facture);
  }

}

