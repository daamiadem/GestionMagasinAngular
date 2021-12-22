import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  Customer: Client  = new Client();
  myForm : FormGroup;


  constructor(private CustomerService: CustomerService,  private router: Router) { }

  ngOnInit(): void {
    this.myForm= new FormGroup({
      idClient : new FormControl('',[Validators.required]),
      nom : new FormControl('',[Validators.required]),
      prenom : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,Validators.email]),
      dateNaissance : new FormControl('',[Validators.required]),
      profession : new FormControl('',[Validators.required]),
      categorieClient : new FormControl('',[Validators.required]),

      })
  }



  get myNom(){
    return this.myForm.get('nom');
  }
  get myPrenom(){
    return this.myForm.get('prenom');
  }
  get myEmail(){
    return this.myForm.get('email');
  }

  get mydateNaissance(){
    return this.myForm.get('dateNaissance');
  }

  get mycategorieClient(){
    return this.myForm.get('categorieClient');
  }
  get myProfession(){
    return this.myForm.get('profession');
  }
  saveCustomer(){
    this.CustomerService.addCustomer(this.myForm.getRawValue()).subscribe(data => {
     console.log(data);
     Swal.fire('Hi', 'Client ajouté avec succés!', 'success').then((result) => {
      if (result.value) {
        this.goToMainPage();      }
    });

    });
  }

    goToMainPage(){
      this.router.navigate(['/customers']);
    }

    onSubmit(){
    console.log(this.Customer);
    this.saveCustomer();
    }



}
