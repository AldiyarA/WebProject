import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, deleteCategory} from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() categoryId: number;
  @Output() delCategory = new EventEmitter();
  category: Category;
  managing = false;
  constructor() { }

  ngOnInit(): void {
    this.category = Category.categories.find(c => c.id === this.categoryId);
  }
  innerText(): string{
    if (this.managing){ return 'Submit';}
    return 'Manage';
  }

  newCategory(): void {
    this.category.categoriesID.push(Category.newCategory());
  }

  delete(): void{
    this.delCategory.emit();
    deleteCategory(this.categoryId);
  }

  deleteCategory(id: number): void {
    this.category.categoriesID = this.category.categoriesID.filter(x => x !== id);
  }
}
