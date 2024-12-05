import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Category {
  _id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.http.get<{ categories: Category[] }>("http://localhost:3000/api/v1/categories").subscribe(
      (response) => {
        this.categories = response.categories; // Accessing the categories array
      },
      (error) => {
        console.log("Error fetching categories:", error);
      }
    );
  }



}
