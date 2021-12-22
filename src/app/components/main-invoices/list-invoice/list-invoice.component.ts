import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service'
import { Facture } from '../../../models/facture'
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  invoices!: Facture[];
  closeResult: string;

  constructor(
    private invoiceService: InvoiceService,
    private confirmDialogService: ConfirmDialogService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    //this.invoiceService.getInvoices().subscribe((invoices) => (this.invoices = invoices));
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.invoiceService.findAllFactures().then((invoices) => {this.invoices = invoices}, (error) => {console.log(error)});
  }

  open(content,idInvoice: number, index: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteInvoice(idInvoice,index);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteInvoice(id: number, index: number) {
    this.invoices.splice(index, 1);
    this.invoiceService.deleteFacture(id).subscribe(() => {}, (error) => {console.log(error)});
  }

  showDialog() {

    this.confirmDialogService.confirmThis("Are you sure to delete?", function () {
      alert("yes");
    }, function () {
      alert("no");
    })
  }
}
