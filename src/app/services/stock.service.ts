import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  apiUrl: string = "http://localhost:8081/SpringMVC/servlet/";
  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json'})}

  constructor(private _http:HttpClient) { }
  getAllStocksFromDb():Observable<Stock[]>{
    return this._http.get<Stock[]>(this.apiUrl+"getAllStocks");
      }
      addStock(myObject:Stock): Observable<Stock>{
        return this._http.post<Stock>(this. apiUrl+"add-stock", myObject, this.httpOptions); }
        updateData(myObject:Stock): Observable<Stock>{
          return this._http.put<Stock>(this.apiUrl+'modify-stock', myObject, this.httpOptions); }
        deleteStock (Stock: Stock | number): Observable<Stock> {
          const id = typeof Stock === 'number' ? Stock : Stock.idStock;
          return this._http.delete<Stock>(this.apiUrl+'remove-stock/'+id);
          }

          getStockbyid(id: number): Observable<Stock> {
            return this._http.get<Stock>(this.apiUrl +'retrieve-stock/'+ id);
           }
          getStockbylibelle(libelle: string): Observable<Stock> {
            return this._http.get<Stock>(this.apiUrl +'retrieve-stockbylibelle/'+ libelle);
           }
           getnbstock(): Observable<number> {
            return this._http.get<number>(this.apiUrl +'retrievecountqtestockinf');
           }
           getallnbstock(): Observable<number> {
            return this._http.get<number>(this.apiUrl +'retrivecountstock');
           }

              }

