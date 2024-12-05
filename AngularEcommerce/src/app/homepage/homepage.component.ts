import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Product {
  _id: string;
  name: string;
  excerpt: string;
  price: number;
  category: {
    name: string;
  };
}


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<{ products: Product[] }>('http://localhost:3000/api/v1/products').subscribe(
      (response) => {
        this.products = response.products;
        console.log(this.products);
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );
  }
}
