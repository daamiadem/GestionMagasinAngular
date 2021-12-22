import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { DetailFacture } from 'src/app/models/detailFacture';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-invoice-detail-form',
  templateUrl: './invoice-detail-form.component.html',
  styleUrls: ['./invoice-detail-form.component.css']
})
export class InvoiceDetailFormComponent implements OnInit {
  detailInvoiceFrom: FormGroup;
  columns:string[];
  detailFacture: DetailFacture;
  produits: Produit[];
  produit: Produit;
  detailFactures: DetailFacture[] = [];

  @Output() addDetailInvoiceEvent = new EventEmitter<DetailFacture[]>();

  constructor(private formBuilder: FormBuilder, private produitService: ProduitService) {
    this.columns = ['Items', 'Quantity', 'Discount Amount', 'Discount Price', 'Price','Actions'];
   }

  ngOnInit(): void {
    this.createForm();
    this.getProduits();
    console.log(this.tableRowArray);
  }

/**
 * Initializes the Form & by default adds an empty row to the PRIMENG TABLE
 */
 private createForm(): void {
  this.detailInvoiceFrom = this.formBuilder.group({
      //tableRowArray is a FormArray which holds a list of FormGroups
      tableRowArray: this.formBuilder.array([
          this.createTableRow()
      ])
  })
}

/**
 * Returns the FormGroup as a Table Row
 */
 private createTableRow(): FormGroup {
  return this.formBuilder.group({
    produit: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    Remise: new FormControl('', Validators.required),
    montantRemise: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required)
  });
}



get tableRowArray(): FormArray {
  return this.detailInvoiceFrom.get('tableRowArray') as FormArray;
}

addNewRow(index: number): void {
  this.getDetailFactureRow(index);
  this.tableRowArray.push(this.createTableRow());
  console.log();
}

onDeleteRow(rowIndex:number): void {
  this.tableRowArray.removeAt(rowIndex);
}

calculatePrice(){

}

getDetailFactureRow(index : number){
  this.detailFacture = new DetailFacture();
  this.detailFacture.produit = this.tableRowArray.value[index].produit;
  this.detailFacture.qte = this.detailInvoiceFrom.value.tableRowArray[index].quantite;
  this.detailFacture.prixTotal = this.detailFacture.qte * this.detailFacture.produit.prixUnitaire;
  this.detailFacture.pourcentageRemise = this.detailInvoiceFrom.value.tableRowArray[index].Remise;
  this.detailFacture.montantRemise = this.detailFacture.prixTotal * (this.detailFacture.pourcentageRemise / 100);
  this.detailFactures.push(this.detailFacture);
  this.passDetailFactures();
  }



  addDetailInvoice() {
  }

  getProduits(){
    this.produitService.findAllProduits().subscribe((p)=>this.produits=p);
  }

  passDetailFactures(){
    this.addDetailInvoiceEvent.emit(this.detailFactures);
  }

}
