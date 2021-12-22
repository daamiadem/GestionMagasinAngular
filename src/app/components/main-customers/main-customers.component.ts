import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from 'ng-apexcharts';
import { Client } from 'src/app/models/client';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main-customers',
  templateUrl: './main-customers.component.html',
  styleUrls: ['./main-customers.component.css']
})
export class MainCustomersComponent implements OnInit {
  list:Client[]= [];
  listInitial: Client[]= [];
  customer: Client;
  show : Boolean = false;
  p: number = 1;
  closeResult='';
  searchText:any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions;

  public doughnutChartLabels: any[] = [];
  public doughnutChartData: any = [];
  public typeData: Array<Client> = [];

  nbClientOrdinaire:number=0;
  nbClientFidele:number=0;
  nbClientPremium:number=0;

  constructor(private cs:CustomerService,private modalService: NgbModal ,private ac:ActivatedRoute,private router: Router)
  {

  }



  ngOnInit(): void {
    this.cs.getAllCustomersFromDB().subscribe(res=> {this.list = res,
      this.listInitial=this.list;
     console.log(this.list);
    })



    this.cs.getNumberCustomerFidele().subscribe(res=> {this.nbClientFidele = res
      console.log("client fidele "+this.nbClientFidele);

  this.cs.getNumberCustomerOrdinaire().subscribe(res=> {this.nbClientOrdinaire = res,
        console.log("client nbClientOrdinaire "+this.nbClientOrdinaire);

       this.cs.getNumberCustomerPremium().subscribe(res=> {this.nbClientPremium = res,
        console.log("client nbClientPremium "+this.nbClientPremium);

          //charts

     this.chartOptions = {
      series: [this.nbClientFidele,this.nbClientOrdinaire,this.nbClientPremium],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Fidele", "Ordinaire", "Premium"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };  }) }) })


  }

getCatOrdinaire()
{
  for(let k in this.list){
    if(this.list[k].categorieClient=="ORDINARE")
    {
      this.nbClientOrdinaire+=1;
    }
    console.log("nbClientOrdinaire = "+this.nbClientOrdinaire);
  }
}


  getCustomerByCategory(cat:string){
    this.cs.getCustomerByCategory(cat).subscribe(res=> {this.list = res,
      this.listInitial=this.list;
     console.log(this.list);
      })
  }


  getAll(){/*
    this.cs.getAllCustomersFromDB().subscribe(res=> {this.list = res,
      this.listInitial=this.list;
     console.log(this.list);
      }) */
      location.reload();
  }
  getCustomerByProfession(profession:string){
    this.cs.getCustomerByProfession(profession).subscribe(res=> {this.list = res,
      this.listInitial=this.list;
     console.log(this.list);
      })
  }

  deleteCustomer(id:number,i:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
    console.log(id);
    this.cs.deleteCustomer(id).subscribe();
    this.list.splice(i,1);
    Swal.fire(

      'Removed!',
      'Customer removed successfully.',
      'success'
    )
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Customer still in our database.)',
      'error'
    )
  }
})

}




  showEdit(i:Client){
    this.show = true;
    this.customer=i;
  }


  updateCustomer(i:Client)
  {
for(let k in this.list)

  if(this.list[k].idClient == i.idClient)
  {
    this.list[k]=i;
    this.show = !this.show;
  }
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

