import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SquareService {

  constructor() { }
  doSquare(no:number){
    return no*no;
  }
}
