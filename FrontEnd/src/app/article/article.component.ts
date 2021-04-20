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
  @Output() onDelete = new EventEmitter();
  managing = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.article.content.length)
  }
  checkLength(len1: number, len2: number): boolean{
    return this.article.content !== null && this.article.content.length >= len1 && this.article.content.length < len2;
  }
  save(): void{
    this.managing = false;
    this.update.emit(this.article);
  }
  delete(): void{
    this.onDelete.emit();
  }
}
