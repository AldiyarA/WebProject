import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import {FormsModule} from '@angular/forms';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    CategoriesListComponent,
    CategoryComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
