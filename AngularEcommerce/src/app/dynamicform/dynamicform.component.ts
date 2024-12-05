import { Component } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import { SquareService } from '../square.service';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrl: './dynamicform.component.css'
})
export class DynamicformComponent {
  contactForm:FormGroup;
  result:number=0;
  constructor(private formBuilder:FormBuilder,private squareServiceOb:SquareService){
    this.result=squareServiceOb.doSquare(4);
    this.contactForm=this.formBuilder.group({
      fullName:[""],
      email:[""],
      meassage:[""],
    });
  }

  onSubmit(){
    console.log("your form data: ",this.contactForm.value);
  }


}
