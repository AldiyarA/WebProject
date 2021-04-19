import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Article} from '../models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article = undefined;
  @Output() update = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  save(): void{
    this.update.emit(this.article);
  }
}
