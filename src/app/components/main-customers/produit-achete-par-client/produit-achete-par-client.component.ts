import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produit } from 'src/app/models/produit';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-produit-achete-par-client',
  templateUrl: './produit-achete-par-client.component.html',
  styleUrls: ['./produit-achete-par-client.component.css']
})
export class ProduitAcheteParClientComponent implements OnInit {

  list:Produit[]= [];
  listInitial: Produit[]= [];


  @Input ()  idFacture:string="17";
  @Input()  idClient  :string="4"; //

  constructor(private cs:CustomerService,private modalService: NgbModal ,private ac:ActivatedRoute,private router: Router)
{

}
  ngOnInit(): void {

    this.cs.getPurchaseHistoryByClient(this.idClient,this.idFacture).subscribe(res=> {this.list = res,
      this.listInitial=this.list;
     console.log(this.list);
    })
  }
/*
  ngOnChanges(change:SimpleChanges){


    if(!change.ProduitToDislpay.firstChange )
    {

    this.list;
  }
  console.log(change);
console.log(this.ProduitToDislpay);
  }
*/

}
