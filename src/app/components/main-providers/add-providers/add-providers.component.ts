import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Fournisseur } from 'src/app/models/fournisseur';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styleUrls: ['./add-providers.component.css']
})
export class AddProvidersComponent implements OnInit {
  FormProviderAdd : FormGroup;
  FournisseurAdd : Fournisseur ;
  @Output() ajouterevent : EventEmitter<Fournisseur>= new EventEmitter();

  constructor(private PS : ProvidersService, private ac : ActivatedRoute) { }

  ngOnInit(): void {
    this.FormProviderAdd=new FormGroup({
      codeFournisseur:new FormControl('',Validators.required),
      libelleFournisseur:new FormControl('',Validators.required),
      adresseFournisseur: new FormControl('',Validators.required),
      numtel: new FormControl('',[Validators.required,Validators.pattern("[0-9]{8}")]),
      dateCreation:new FormControl('',Validators.required),
      categorieProduit:new FormControl('',Validators.required)
    })
  }
  get codeFournisseurc(){return this.FormProviderAdd.get('codeFournisseur');};
  get libelleFournisseurc (){return this.FormProviderAdd.get("libelleFournisseur");};
  get adresseFournisseurc (){return this.FormProviderAdd.get("adresseFournisseur");};
  get numtelC (){return this.FormProviderAdd.get("numtel");};
  get dateCreationC (){return this.FormProviderAdd.get("dateCreation");};
  get categorieProduitC (){return this.FormProviderAdd.get("categorieProduit");};
/*
  Ajouterf(){
    this.ajouterevent.emit(this.FormProviderAdd.value);
    this.FormProviderAdd.reset();

   }*/

   Ajouterf(){
    this.ajouterevent.emit(this.FormProviderAdd.value);
    this.PS.ajouterProvider(this.FormProviderAdd.getRawValue()).subscribe();
    this.FormProviderAdd.reset();
  }

}
