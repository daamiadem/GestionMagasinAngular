import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DetailProduitEntity } from 'src/app/models/detailProduitEntity';
import { Produit } from 'src/app/models/produit';
import { Rayon } from 'src/app/models/rayon';
import { Stock } from 'src/app/models/stock';
import { ProduitService } from 'src/app/services/produit.service';
import { RayonService } from 'src/app/services/rayon.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  myForm: FormGroup;
  stocks: Stock[];
  stock:Stock;
  rayons: Rayon[];
  rayon:Rayon;
  detailProduit: DetailProduitEntity;
  produit: Produit;

  constructor(
    private produitService: ProduitService,
    private stockService: StockService,
    private rayonService: RayonService
  ) { }


  ngOnInit(): void {
    this.getStocks();
    this.getRayons();
    this.initializeForm();
  }

  initializeForm(){
    this.myForm=new FormGroup({
      codeProduit : new FormControl('',[Validators.required]),
      libelleProduit : new FormControl('',[Validators.required]),
      prixUnitaire : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      stock : new FormControl('',[Validators.required]),
      rayon: new FormControl('',[Validators.required]),
      categorieProduit : new FormControl('',[Validators.required]),
    })
  }

  get codeProduit(){
    return this.myForm.get("codeProduit")
  }

  get libelleProduit(){
    return this.myForm.get("libelleProduit")
  }

  get prixUnitaire(){
    return this.myForm.get("prixUnitaire")
  }

  get Stock(){
    return this.myForm.get("Stock")
  }

  get Rayon(){
    return this.myForm.get("Rayon")
  }

  get categorieProduit(){
    return this.myForm.get("categorieProduit")
  }

  getProduitForm(){
    this.produit=new Produit();
    this.produit.codeProduit=this.codeProduit.value;
    this.produit.libelleProduit=this.libelleProduit.value;
    this.produit.prixUnitaire=this.prixUnitaire.value;
    this.produit.stock=this.stock;
    this.produit.rayon=this.rayon;
    this.detailProduit=new DetailProduitEntity();
    this.detailProduit.categorieProduit=this.categorieProduit.value;
    this.produit.detailProduitEntity=this.detailProduit;
  }



  onSubmit(){

    this.getProduitForm();
    console.log(this.produit);
    this.produitService.addProduit(this.produit).subscribe(
      (produit:Produit)=>{
        console.log(produit);
      });

  }

  getStocks() {
    this.stockService.getAllStocksFromDb().subscribe(
      (stocks: Stock[]) => {
        this.stocks = stocks;
      }
    );
  }

  getRayons() {
    this.rayonService.getAllRayon().subscribe(
      (rayons: Rayon[]) => {
        this.rayons = rayons;
      }
    );
  }

  onChangeSelectStock(event:any){
    let id=event.target.value;
    this.stock=this.stocks.find(s=>s.idStock==id);
  }
  onChangeSelectRayon(event:any){
    let id=event.target.value;
    this.rayon=this.rayons.find(s=>s.idRayon==id);
  }

}
