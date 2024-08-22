import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Category {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit{
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      excerpt: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      status: [false]
    });
  }

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

  onSubmit() {
    if (this.productForm.valid) {
      this.http.post("http://localhost:3000/api/v1/products", this.productForm.value).subscribe(
        (response) => {
          console.log("Product added successfully:", response);
          this.productForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.log("Error adding product:", error);
        }
      );
    }
  }

}
