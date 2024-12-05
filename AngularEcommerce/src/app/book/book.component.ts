import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  bookId:string | null;
  data: string;
  constructor(private activatedRoute:ActivatedRoute){
    // this.bookId="";
    // this.data="";
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params)=>{
      console.log(params);
      this.bookId=params.get("bookId");

    });

    this.activatedRoute.data.subscribe((data)=>{
      this.data=data["pageInfo"];
    })
    
  }

}
