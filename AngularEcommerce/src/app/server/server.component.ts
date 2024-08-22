import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface BackendRequest{
  fact:string;
}

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent {
  data: any;
  catFact:string="";
  constructor(private http:HttpClient){
    this.data="";
    this.getData();
  }

  getData(){
    this.http.get<BackendRequest>("https://catfact.ninja/fact").subscribe(
      (response)=>{
        this.data=response;
        this.catFact=response.fact;
        console.log(response);
      },
      (error)=>{
        console.error("Error fetching data", error);
      }
      
    );
  }

}
