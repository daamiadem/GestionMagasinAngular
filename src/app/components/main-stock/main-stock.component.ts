import { NgbModal , ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Stock } from './../../models/stock';
import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { EditstockComponent } from './editstock/editstock.component';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-main-stock',
  templateUrl: './main-stock.component.html',
  styleUrls: ['./main-stock.component.css']
})
export class MainStockComponent implements OnInit {

  @ViewChild(EditstockComponent)
private child : EditstockComponent;
  list: Stock[];
  listIn: Stock[];

  mystock: Stock;
  show:Boolean = false;
  closeResult = '';
  prop:string ="";
  p: number = 1;
  k: number = 0;
  searchText;
  test:Boolean = false;
  constructor(private sc:StockService,private modalService: NgbModal,private ac : ActivatedRoute) { }

  ngOnInit(): void {

    this.sc.getAllStocksFromDb().subscribe(res=> {
      console.log(res)
      this.list=res;
    })
    this.sc.getnbstock().subscribe(res=> {
      console.log(res)
      if (res>0)
      // Swal.fire('You have '+res+' stock(s) that are under minimum stock');
      this.k=res;
      console.log("aaadsa")

    })
  }
  statusClass = 'notificationsnotactive';

  setActiveClass(){
    if (this.test)
    {
    this.statusClass = 'notificationsactive';
    this.test=false;
    console.log("yesjosh")
    }
    else
    {
      this.statusClass = 'notificationsnotactive';
    this.test=true;
    console.log("yessssjosh")

    }
  }

 fileDownload()
 {

  var options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'STOCK',
    useBom: true,
    headers: ["id stock", "Quantité stock", "Quantité minimum du stock","libelle du stock"]
  };

  new ngxCsv(this.list, "Report", options);
 }

  showEdit(i:Stock){
    this.show = true;
    this.mystock=i;
    console.log(this.mystock);
    console.log( "showyea"+this.show);

  }
  addMyObject(st:Stock){
    this.sc.addStock(st).subscribe();
    }
    updateStock(i:Stock){
      for (let k in this.list){
        if (this.list[k].idStock == i.idStock)
        {
          this.list[k]=i;
        }
      }
    }
    deleteStock(i:Stock,k:number){
      Swal.fire({
        title: 'Are you sure?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go ahead.',
        cancelButtonText: 'No, let me think'
      }).then((result) => {
        if (result.value) {
          this.sc.deleteStock(i).subscribe( () =>{


            this.ngOnInit()});
         // this.list.splice(k,1);


          Swal.fire(

            'Removed!',
            'Stock removed successfully.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Stock still in our database.)',
            'error'
          )
        }
      })

      }

  tinyAlert(){
    Swal.fire('You have '+this.k+' stock(s) that are under minimum stock');  }

  successNotification(){
    Swal.fire('Hi', 'We have been informed!', 'success')
  }
      alertConfirmation(){
        Swal.fire({
          title: 'Are you sure?',
          text: 'This process is irreversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, go ahead.',
          cancelButtonText: 'No, let me think'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Removed!',
              'Product removed successfully.',
              'success'
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Product still in our database.)',
              'error'
            )
          }
        })
      }
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
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

}
