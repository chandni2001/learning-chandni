import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FormsexampleComponent } from './formsexample/formsexample.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DynamicformComponent } from './dynamicform/dynamicform.component';
import { BookComponent } from './book/book.component';
import { ServerComponent } from './server/server.component';
import { HttpClientModule} from '@angular/common/http';
import { SquareService } from './square.service';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoryComponent } from './category/category.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    MenuComponentComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    FormsexampleComponent,
    DynamicformComponent,
    BookComponent,
    ServerComponent,
    HomepageComponent,
    CategoryComponent,
    AddproductComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [SquareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
