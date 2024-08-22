import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-formsexample',
  templateUrl: './formsexample.component.html',
  styleUrl: './formsexample.component.css'
})
export class FormsexampleComponent {

  username:string;
  email:string;
  constructor(){
    this.username="";
    this.email="";
  }

  onSubmit(myform:any){
    console.log(myform.value);
    this.username=myform.value.username;
    this.email=myform.value.email;
  }
}
