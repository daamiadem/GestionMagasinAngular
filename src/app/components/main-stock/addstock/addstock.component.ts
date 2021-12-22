import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.css']
})
export class AddstockComponent implements OnInit {
  myForm :FormGroup;

  constructor(private sc:StockService,private route:Router) { }

  ngOnInit(): void {
    this.myForm = new FormGroup ({

    libelleStock : new FormControl('',[Validators.required]),
    qteStock : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
    qteMin : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$") ]),
    })

  }
  Onadd()
  {
    Swal.fire('Success', 'Stock ajouté avec succés!', 'success')

console.log(this.myForm.getRawValue())
this.sc.addStock(this.myForm.getRawValue()).subscribe();
this.route.navigate(['/stock']);

  }
  // addMyObject(obj:Type){
  //    this._service.addData(obj).subscribe();
  //   }
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

}
