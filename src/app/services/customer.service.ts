import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Facture } from '../models/facture';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  list:Client []= [];

  CustomersUrl:string='http://localhost:8081/SpringMVC/servlet';


  constructor(private _http:HttpClient) { }



  getNumberCustomerOrdinaire()
  {
    return this._http.get<number>(this.CustomersUrl+"/client-fidele");
  }
  getNumberCustomerPremium ()
  {
    return this._http.get<number>(this.CustomersUrl+"/client-premium");
  }
  getNumberCustomerFidele()
  {
    return this._http.get<number>(this.CustomersUrl+"/client-ordinaire");
  }

  getPurchaseHistoryByClient(idClient:string,idfacture:string):Observable<Produit[]>{
    return this._http.get<Produit[]>(this.CustomersUrl+"/Produit-by-client/"+idClient+"/"+idfacture);
  }

  getAllCustomersFromDB():Observable<Client[]>{
    return this._http.get<Client[]>(this.CustomersUrl+"/getAllClients");
  }

  getStatClient():Observable<Client[]>{
    return this._http.get<Client[]>(this.CustomersUrl+"/stat-client");
  }


  getCustomerByCategory(categorie:string):Observable<Client[]>{
    return this._http.get<Client[]>(this.CustomersUrl+"/retrieve-client-byCategorieClient/"+categorie);
  }
  getFactureByClient(id:string):Observable<Facture[]>{
    return this._http.get<Facture[]>(this.CustomersUrl+"/facture/"+id);
  }
  getCustomerByProfession(profession:string):Observable<Client[]>{
    return this._http.get<Client[]>(this.CustomersUrl+"/retrieve-client-byProfession/"+profession);
  }

  deleteCustomer (Customer: Client | number): Observable<Client> {
    const id = typeof Customer === 'number' ? Customer : Customer.idClient;
    const url=this.CustomersUrl+'/remove-client/'+id;
    return this._http.delete<Client>(url);
    }


    httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
      }


    addCustomer (Customer: Client): Observable<Client> {

  return this._http.post<Client>(this.CustomersUrl+"/add-client", Customer, this.httpOptions);}



  getCustomerById(id: number): Observable<Client> {
    return this._http.get<Client>(this.CustomersUrl +'/retrieve-client/'+ id); }

    updateCustomer ( Customer: Client): Observable<Client> {
      return this._http.put<Client>(this.CustomersUrl+'/modify-client', Customer, this.httpOptions);
      }

}
