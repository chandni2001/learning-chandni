import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsexampleComponent } from './formsexample/formsexample.component';
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddproductComponent } from './addproduct/addproduct.component';

const routes: Routes = [
  {
    path:"templateform",
    title:"templateform",
    component:FormsexampleComponent,
  },
  {
    path:"dynamicform",
    title:"dynamicform",
    component:DynamicformComponent,
  },
  {
    path:"book/:bookId",
    title:"Book",
    component:BookComponent,
    data:{pageInfo:"sample Book page"},

  },
  {
    path:"homepage",
    title:"homepage",
    component:HomepageComponent,
  },
  {
    path:"category",
    title:"category",
    component:CategoryComponent,
  },
  {
    path:"addproduct",
    title:"addproduct",
    component:AddproductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
