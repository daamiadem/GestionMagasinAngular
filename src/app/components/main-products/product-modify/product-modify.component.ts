import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit';
import { DetailProduitEntity } from 'src/app/models/detailProduitEntity';
import { DetailProduitService } from 'src/app/services/detail-produit.service';
import { Stock } from 'src/app/models/stock';
import { Rayon } from 'src/app/models/rayon';
import { StockService } from 'src/app/services/stock.service';
import { RayonService } from 'src/app/services/rayon.service';


@Component({
  selector: 'app-product-modify',
  templateUrl: './product-modify.component.html',
  styleUrls: ['./product-modify.component.css']
})
 export class ProductModifyComponent implements OnInit {
  myForm: FormGroup;
  stocks: Stock[];
  stock:Stock;
  rayons: Rayon[];
  rayon:Rayon;
  detailProduitEntity: DetailProduitEntity;
  produit: Produit;
  @Input () produitToEdit: Produit ;
  @Input () test:boolean=false;
  @Input() prop2 : Produit;
  @Output() edited = new EventEmitter<Produit>();
  idstock0:number;

  iddtock:number;
  constructor(private produitService: ProduitService,private stockService: StockService,private rayonService: RayonService) { }

  ngOnInit(): void { 
    //this.getStocks();
    this.getRayons();
    this.getStocks();
    



    this.myForm= new FormGroup({
      
     
      idProduit : new FormControl({ "value":this.produitToEdit?.idProduit, "disabled":true },[Validators.required]),
      codeProduit : new FormControl(this.produitToEdit?.codeProduit,[Validators.required]),
      libelleProduit : new FormControl(this.produitToEdit?.libelleProduit,[Validators.required]),
      prixUnitaire : new FormControl(this.produitToEdit?.prixUnitaire,[Validators.required]),
      rayon: new FormControl(this.produitToEdit?.rayon.idRayon,[Validators.required]),
      stock : new FormControl(this.produitToEdit?.stock.idStock,[Validators.required]),
      idDetailProduit : new FormControl(this.produitToEdit?.detailProduitEntity.idDetailProduit,[Validators.required]),
      dateCreation :new FormControl(this.produitToEdit?.detailProduitEntity.dateCreation,[Validators.required]),
      categorieProduit : new FormControl(this.produitToEdit?.detailProduitEntity.categorieProduit,[Validators.required]),
      dateDerniereModification :new FormControl(this.produitToEdit?.detailProduitEntity.dateDerniereModification,[Validators.required]),
 
      
      }) 
    // this.getStocks();
    // this.getRayons();
    // this.initializeForm();
  }
  ngOnChanges(change:SimpleChanges){
if(!change.produitToEdit.firstChange){


    this.myForm.setControl('idProduit', new FormControl(this.produitToEdit?.idProduit));
    this.myForm.setControl('codeProduit', new FormControl(this.produitToEdit?.codeProduit));
    this.myForm.setControl('libelleProduit', new FormControl(this.produitToEdit?.libelleProduit));
    this.myForm.setControl('prixUnitaire', new FormControl(this.produitToEdit?.prixUnitaire));
    this.myForm.setControl('rayon', new FormControl(this.produitToEdit?.rayon.idRayon));
    this.myForm.setControl('stock', new FormControl(this.produitToEdit?.stock.idStock));
    this.myForm.setControl('idDetailProduit', new FormControl(this.produitToEdit?.detailProduitEntity.idDetailProduit));
    this.myForm.setControl('dateCreation', new FormControl(this.produitToEdit?.detailProduitEntity.dateCreation));
    this.myForm.setControl('categorieProduit', new FormControl(this.produitToEdit?.detailProduitEntity.categorieProduit));
    this.myForm.setControl('dateDerniereModification', new FormControl(this.produitToEdit?.detailProduitEntity.dateDerniereModification));
   
    

  
// this.produitService.findProduitByID()
}
}
edit(){
  

  this.edited.emit(this.myForm.getRawValue());
  this.produitService.updateProduit(this.myForm.getRawValue()).subscribe( error => console.log(error));

 console.log(this.myForm.getRawValue());
   
   }
   getStocks() {
    this.stockService.getAllStocksFromDb().subscribe(
     (stocks: Stock[]) => {
        this.stocks = stocks;
      // for(let k in stocks)
      // {
      //   for(let p in stocks[k].produits)
      // { if(this.stocks[k].produits[p].idProduit==this.produitToEdit.idProduit) 
      //  { console.log("id produit courant:"+this.produitToEdit.idProduit);
      //  console.log("id du stock:"+this.stocks[k].idStock);
      //  this.idstock0=this.stocks[k].idStock;
      //  console.log("stock0:"+this.idstock0);
      //   console.log(this.stocks[k].produits[p].idProduit);
      // }
      // }
      // }
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

   get idProduit(){
    return this.myForm.get('idProduit');
  }
  get codeProduit(){
    return this.myForm.get('codeProduit');
  }
  get libelleProduit(){
    return this.myForm.get('libelleProduit');
  }
  get prixUnitaire(){
    return this.myForm.get('prixUnitaire');
  }
  get Rayon(){
    return this.myForm.get('rayon');
  }
  get Stock(){
    return this.myForm.get('stock');
  }
  get Categorie(){
    return this.myForm.get('categorieProduit');
  }
  }
