import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../models/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  @Input() categoryId: number;
  category: Category;
  constructor() { }

  ngOnInit(): void {
    this.category = Category.categories.find(c => c.id === this.categoryId);
  }

}
