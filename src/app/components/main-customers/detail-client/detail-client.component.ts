import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from 'src/app/models/facture';
import { Produit } from 'src/app/models/produit';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {

  list:Facture[]= [];
  listInitial: Facture[]= [];
  customer: Facture;
  nom="a";
  total=0;
  idClient:string;
  show : Boolean = false;
  MyProduit:Produit;
  IdClient :string;
  IdFacture :string;

  constructor(private cs:CustomerService,private ac:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {


    this.ac.paramMap.subscribe(
      res=>{
      console.log(res.get('idclient'));
      this.idClient=res.get('idclient');


     } );
    this.cs.getFactureByClient(this.idClient).subscribe(res=> {this.list = res,
      this.listInitial=this.list;
      console.log( this.list)
      for(let k in this.list)
      { this.total= this.total+this.list[k].montantFacture;

      }
      console.log("total "+this.total);
    })


  }

  ShowListProduit(idFac:number,i:number)
  {
    this.show=!this.show;
   this.IdClient= this.list[0].client.idClient.toString();
   this.IdFacture=idFac.toString();
  }


}
