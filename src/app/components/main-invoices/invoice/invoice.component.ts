import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailFacture } from 'src/app/models/detailFacture';
import { Facture } from 'src/app/models/facture';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoice: Facture;
  detailInvoices: DetailFacture[] = [];
  idInvoice: number;
  total:number;

  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idInvoice = this.route.snapshot.params.id;
    this.invoiceService.findFacture(this.idInvoice).subscribe(f =>this.invoice = f);
    this.invoiceService.findAllDetailFactures(this.idInvoice).subscribe(d => this.detailInvoices = d);
    this.total = this.calculeTotal(this.invoice.montantFacture,this.invoice.montantRemise);
  }

  calculeTotal(a: number, b: number) {
    return a-b;
  }

  payInvoice() {
    console.log(this.invoice);
    this.invoiceService.updateFactureStatus(this.invoice).subscribe();
    this.router.navigate(['/invoices']);
  }


}
