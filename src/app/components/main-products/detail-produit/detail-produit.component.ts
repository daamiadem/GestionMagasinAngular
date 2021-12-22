import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { DetailProduitEntity } from 'src/app/models/detailProduitEntity';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  y=0;
  i=0;
  produits:Produit[];
  produit:Produit;
  constructor(private ac:ActivatedRoute , private ps:ProduitService, private router: Router) { }

  ngOnInit(): void {


    // this.ps.findAllProduits().subscribe((p)=>{this.produits=p;
    //   console.log(this.produits)})
    // this.ac.queryParams.subscribe(params=> {
    //   this.y=params['id'];
    //   console.log("daaad"+this.y);
    // });
    this.ac.queryParams.subscribe(params=> {
      this.i=params['id'];
    })
    this.ps.findProduitByID(this.i).subscribe(res=> {
      this.produit=res;
    })
  }


}
