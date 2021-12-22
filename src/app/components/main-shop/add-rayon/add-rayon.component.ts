import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RayonService } from 'src/app/services/rayon.service';

@Component({
  selector: 'app-add-rayon',
  templateUrl: './add-rayon.component.html',
  styleUrls: ['./add-rayon.component.css']
})
export class AddRayonComponent implements OnInit {
  alert:boolean = false;
  rayonForm: FormGroup;

  constructor(private rayonService: RayonService) { }

  ngOnInit(): void {
    this.intializeFormGroup();
  }

  intializeFormGroup() {
    this.rayonForm = new FormGroup({
      codeRayon: new FormControl('',[Validators.required]),
      libelleRayon: new FormControl('',[Validators.required])
    });
  }

  get codeRayon() {
    return this.rayonForm.get('codeRayon');
  }

  get libelleRayon() {
    return this.rayonForm.get('libelleRayon');
  }

  addRayon(){
    console.log(this.rayonForm.value);
    this.rayonService.addRayon(this.rayonForm.value).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.alert = true;
    this.rayonForm.reset();
  }

  closeAlert(){
    this.alert = false;
  }

}
