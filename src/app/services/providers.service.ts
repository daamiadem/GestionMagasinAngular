import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../models/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private url = 'http://localhost:8081/SpringMVC/servlet';

  constructor(private http : HttpClient) { }

  public ajouterProvider(fournisseur: Fournisseur) : Observable<Fournisseur>{

    return this.http.post<Fournisseur>(this.url + "/addFournisseur",fournisseur, this.httpOptions);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
    }


  getAllProviders(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.url + "/retrieveFournisseur");
  }

  RemoveProvider(Fournisseur: Fournisseur | number): Observable<Fournisseur> {
    const id = typeof Fournisseur === 'number' ? Fournisseur : Fournisseur.idFournisseur;
    const url = this.url + '/removeFourisseurs/' + id;
    return this.http.delete<Fournisseur>(url);
  }


  UpdateFournisseur (Fournisseur: Fournisseur): Observable<Fournisseur> {


    return this.http.put<Fournisseur>(this.url + '/updateFournisseur',Fournisseur);
  }

  RechercheByCat(categorieProduit : String ): Observable<Fournisseur[]> {
    const url = this.url + '/retrieveFournisseurByCat/'+ categorieProduit;
    return this.http.get<Fournisseur[]>(url);
  }


  Recherchebydate (dateDebut : Date , dateFin : Date ): Observable<Fournisseur[]> {
    const url = this.url +'/retrieveFournisseurBydat/'+ dateDebut+'/'+dateFin;
    return this.http.get<Fournisseur[]>(url);
  }


  countFournisseurByCat(categorieProduit : string ): Observable<number>{
    const url =this.url +'/CountDistinctByCat/'+categorieProduit;
    return this.http.get<number>(url);
  }

}
