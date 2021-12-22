import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RayonService } from 'src/app/services/rayon.service';
import { Rayon } from 'src/app/models/rayon';

@Component({
  selector: 'app-edit-rayon',
  templateUrl: './edit-rayon.component.html',
  styleUrls: ['./edit-rayon.component.css']
})
export class EditRayonComponent implements OnInit {
FormRayonEdit : FormGroup;
rayon : Rayon[];
rayonEdit : Rayon;
@Input() RayonToEdit : Rayon;
  @Input() prop2 : Rayon;
  @Output() editRayon = new EventEmitter<Rayon>();

  constructor(private RS : RayonService, private ac : ActivatedRoute) { }

  ngOnInit(): void {
    this.FormRayonEdit = new FormGroup({
      idRayon : new FormControl({"value" : this.RayonToEdit.idRayon, "disabled":true}),
      codeRayon :new FormControl(this.RayonToEdit.codeRayon),
      libelleRayon :new FormControl(this.RayonToEdit.libelleRayon)
    })
  }

  EditRayon(){
    console.log(this.FormRayonEdit.getRawValue());
    this.RS.updateRayon(this.FormRayonEdit.getRawValue()).subscribe();
    this.editRayon.emit(this.FormRayonEdit.getRawValue());
    this.FormRayonEdit.reset();
  }

}
