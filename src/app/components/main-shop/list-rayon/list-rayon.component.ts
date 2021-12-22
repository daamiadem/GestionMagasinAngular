import { Component, OnInit } from '@angular/core';
import { Rayon } from 'src/app/models/rayon';
import { RayonService } from 'src/app/services/rayon.service';

@Component({
  selector: 'app-list-rayon',
  templateUrl: './list-rayon.component.html',
  styleUrls: ['./list-rayon.component.css']
})
export class ListRayonComponent implements OnInit {

  rayons: Rayon[] | undefined;

  constructor(private rayonService: RayonService) { }

  ngOnInit(): void {
    this.getAllRayon();
  }

  getAllRayon() {
    this.rayonService.getAllRayon().subscribe((rayons) => this.rayons = rayons);
  }

  deleteRayon(idRayon: number,index:number){
    this.rayons.splice(index, 1);
    this.rayonService.deleteRayon(idRayon).subscribe(()=>{},(error)=>{console.log(error)} );
  }

}
