import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css'
})
export class HelloWorldComponent {
  msg:string;
  students:string[];
  showMsg:boolean;
  constructor(){
    this.msg="Angular is good";
    this.students=["chandni","sri"];
    this.showMsg=true;
  }

  sayHello():void{
    alert("hello i am angular");

  }
  toggleShowMsg(){
    this.showMsg=!this.showMsg;
  }
  

}
