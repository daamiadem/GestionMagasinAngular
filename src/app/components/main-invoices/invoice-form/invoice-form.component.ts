import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { DetailFacture } from 'src/app/models/detailFacture';
import { Facture } from 'src/app/models/facture';
import { Produit } from 'src/app/models/produit';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup ;
  detailInvoiceForm: FormGroup;
  detailFactures: DetailFacture[] = [];
  produits: Produit[];
  alert:boolean = false;
  clients: Client[];
  client: Client;
  facture: Facture;
  totalFacture: number;
  montantRemise=0;

  constructor(private customerService: CustomerService,private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit(): void {
    this.intializeForm();
    this.initializeDetailInvoiceForm();
    this.getCustomers();
  }

  intializeForm() {
    this.invoiceForm = new FormGroup({
      client: new FormControl(''),
      montantFacture: new FormControl(''),
      montantRemise: new FormControl(''),
      detailFacture: new FormControl('')
    });
  }

  initializeDetailInvoiceForm() {
    this.detailInvoiceForm = new FormGroup({
      produit: new FormControl(''),
      quantite: new FormControl(''),
      prix: new FormControl(''),
      Remise: new FormControl(''),
      montantRemise: new FormControl(''),
      total: new FormControl('')
    });
  }


  getCustomers(){
    this.customerService.getAllCustomersFromDB().subscribe(clients => this.clients = clients);
  }

  getDetailFactures(detailFactures: DetailFacture[]) {
    this.detailFactures = detailFactures;
    this.totalFacture = this.calculerTotal();
    console.log(this.detailFactures);
  }

  calculerTotal(): number {
    let total = 0;
    this.detailFactures.forEach(detailFacture => {
      total += detailFacture.prixTotal;
      this.montantRemise += detailFacture.montantRemise;
    });
    return total;
  }

  addDetailFactureToDb(detailFacture: DetailFacture) {
    this.invoiceService.addDetailFacture(detailFacture).subscribe(detailFacture => {
      console.log(detailFacture);
    });
  }



  submiteInvoice() {
    this.facture = new Facture();
    this.facture.client = this.client;
    this.facture.montantFacture = this.totalFacture;
    this.facture.montantRemise = this.montantRemise;
    this.facture.detailFacture = this.detailFactures;
    this.invoiceService.createFacture(this.facture).subscribe(factureResponse => {
      console.log(factureResponse);
      this.detailFactures.forEach(detailFacture => {
        detailFacture.facture = factureResponse.data;
        console.log(detailFacture);
        this.addDetailFactureToDb(detailFacture);
      });
    });
    this.alert = true;
    this.invoiceForm.reset();
    Swal.fire('Hi', 'Facture ajouté avec succés!', 'success').then((result) => {
      if (result.value) {
        this.goToMainPage();      }
    });
  }

  getClient(){
    return this.invoiceForm.get('client');
  }

  onChangeSelectClient(event: any) {
    let id = event.target.value;
    this.client = this.clients.find(client => client.idClient == id);
    console.log(this.client);
  }

  closeAlert() {
    this.alert = false;
  }

  goToMainPage(){
    this.router.navigate(['/invoices']);
  }

}
