import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, deleteCategory} from '../../models/category';
import {Article} from '../../models/article';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  article: Article;
  constructor() { }

  ngOnInit(): void {
    this.article = Article.articles.find(x => x.id === 1);
  }
}
