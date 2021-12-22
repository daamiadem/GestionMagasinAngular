import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/models/client';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  primary = '#1976d2';

  @ViewChild('content')
  private content: TemplateRef<any>;

  id: number=0;
  Customer: Client = new Client();
  closeResult='';
  @Input () test:boolean=false;

  @Input() CustomerToEdit : Client;
  @Input() prop2 : Client; //

@Output() edited = new EventEmitter<Client>();
  myForm : FormGroup;


  constructor(private cs: CustomerService,private modalService: NgbModal ,  private ac:ActivatedRoute,private router: Router) { }

  ngOnInit (){

    this.myForm= new FormGroup({
      idClient : new FormControl({ "value":this.CustomerToEdit?.idClient, "disabled":true },[Validators.required]),
      nom : new FormControl(this.CustomerToEdit?.nom,[Validators.required]),
      prenom : new FormControl(this.CustomerToEdit?.prenom,[Validators.required]),
      email : new FormControl(this.CustomerToEdit?.email,[Validators.required]),
      dateNaissance : new FormControl(this.CustomerToEdit?.dateNaissance,[Validators.required]),
      profession : new FormControl(this.CustomerToEdit?.profession,[Validators.required]),
      categorieClient : new FormControl(this.CustomerToEdit?.categorieClient,[Validators.required]),

      })
  }

  ngAfterViewInit(){
    if (this.test==true)
    {
    //  this.modalService.open(this.content,{size : 'lg',windowClass: 'my-class' });

      this.modalService.open(this.content,{size : 'lg',windowClass: 'my-class' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  ngOnChanges(change:SimpleChanges){


    if(!change.CustomerToEdit.firstChange )
    {
      if (this.test==true)
      {
        //this.modalService.open(this.content,{size : 'lg', windowClass: 'my-class'});
        this.modalService.open(this.content,{size : 'lg',windowClass: 'my-class' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }


    this.myForm.setControl('idClient', new FormControl(this.CustomerToEdit?.idClient));
    this.myForm.setControl('nom', new FormControl(this.CustomerToEdit?.nom));
    this.myForm.setControl('prenom', new FormControl(this.CustomerToEdit?.prenom));
    this.myForm.setControl('email', new FormControl(this.CustomerToEdit?.email));
    this.myForm.setControl('dateNaissance', new FormControl(this.CustomerToEdit?.dateNaissance));
    this.myForm.setControl('profession', new FormControl(this.CustomerToEdit?.profession));
    this.myForm.setControl('categorieClient', new FormControl(this.CustomerToEdit.categorieClient));


  }
  this.modalService.activeInstances.closed;
  console.log(change);
  console.log(this.CustomerToEdit);

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


  edit(){
    Swal.fire('Hi', 'Client modifié avec succés!', 'success').then((result) => {
      if (result.value) {
        location.reload();
      }
    });

    this.edited.emit(this.myForm.getRawValue());
    this.cs.updateCustomer(this.myForm.getRawValue()).subscribe( error => console.log(error));

   console.log(this.myForm.getRawValue());

     }
     /*
  onSubmit(){
    this.cs.updateCustomer(this.Customer).subscribe( data => {
        this.goToMainPage();
      }
      , error => console.log(error));
  }*/

  goToMainPage(){
    // this.router.navigate(['/customers']);
   location.reload();
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


openModalDialogCustomClass(content) {
  this.modalService.open(content, { modalDialogClass: 'dark-modal' });
}


}
