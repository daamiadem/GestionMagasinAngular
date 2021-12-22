import { Stock } from './../../../models/stock';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-detail-stock',
  templateUrl: './detail-stock.component.html',
  styleUrls: ['./detail-stock.component.css']
})
export class DetailStockComponent implements OnInit {
i=0;
list: Stock[];
stock:Stock;
  constructor(private sc:StockService,private ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.ac.queryParams.subscribe(params => {
      console.log(params['id'])

      this.i=params['id'];
      });
    this.sc.getStockbyid(this.i).subscribe(res=> {
      console.log(res)
      this.stock=res;
    })


      console.log("yooo"+this.i);
  }

}
