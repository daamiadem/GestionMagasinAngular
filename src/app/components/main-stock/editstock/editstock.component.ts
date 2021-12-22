
import { Stock } from './../../../models/stock';
import { TemplateRef,Component, Input, OnInit, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-editstock',
  templateUrl: './editstock.component.html',
  styleUrls: ['./editstock.component.css']
})


export class EditstockComponent implements OnInit {
  @ViewChild('content')
  private content: TemplateRef<any>;
  myForm :FormGroup;
  list: Stock[];
  contentt:any;
  Stock:Stock = new Stock();
  @Input () test:boolean=false;
  @Input () stockToEdit : Stock;
  @Input () prop2 : Stock;
  @Output () edited = new EventEmitter <Stock> ();
  constructor(private sc:StockService,private modalService: NgbModal,private route:Router) { }
  closeResult = '';

  ngOnInit(): void {
    console.log("feledit:"+this.test)
    this.myForm= new FormGroup({
      idStock : new FormControl({"value":this.stockToEdit.idStock,"disabled":true}),
      libelleStock : new FormControl(this.stockToEdit.libelleStock,[Validators.required]),
      qteStock : new FormControl(this.stockToEdit.qteStock,[Validators.required,Validators.pattern("^[0-9]*$")]),
      qteMin : new FormControl(this.stockToEdit.qteMin,[Validators.required,Validators.pattern("^[0-9]*$") ])
    })
  }

  ngAfterViewInit(){
    if (this.test==true)
    {
      this.modalService.open(this.content,{ centered: true , size: 'lg',windowClass: 'my-class'
    } );
    }

  }

  ngOnChanges(changes:SimpleChanges)
  {
   console.log(this.test)
    // this.myForm= new FormGroup({
    //   idInvoice: new FormControl(this.invoiceToEdit.idInvoice),
    //   dateBill: new FormControl(this.invoiceToEdit.dateBill),
    //   discountAmount: new FormControl(this.invoiceToEdit.discountAmount),
    //   Status: new FormControl(this.invoiceToEdit.Status),
    //   BillAmount:new FormControl(this.invoiceToEdit.billAmount)
    // })
    if (!changes.stockToEdit.firstChange){
      if (this.test==true)
      {
        this.modalService.open(this.content,{ centered: true , size: 'lg',windowClass: 'my-class'
      });
      }
      this.myForm.setControl('idStock', new FormControl (this.stockToEdit.idStock));
    this.myForm.setControl('libelleStock', new FormControl (this.stockToEdit.libelleStock));
    this.myForm.setControl('qteStock', new FormControl (this.stockToEdit.qteStock));
    this.myForm.setControl('qteMin', new FormControl (this.stockToEdit.qteMin));
    }

    console.log(this.stockToEdit)
    console.log(changes)

  }

  get idStock()
  {
    return this.myForm.get("idStock")
  }
  get libelleStock()
  {
    return this.myForm.get("libelleStock")
  }
  get qteStock()
  {
    return this.myForm.get("qteStock")
  }
  get qteMin()
  {
    return this.myForm.get("qteMin")
  }

  edit(){
    Swal.fire('Hi', 'Stock modifié avec succés!', 'success')

    this.edited.emit(this.myForm.getRawValue())
    this.sc.updateData(this.myForm.getRawValue()).subscribe();
    // this.route.navigate(['/stock']);

    console.log(this.myForm.getRawValue())
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

}
