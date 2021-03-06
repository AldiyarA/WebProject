import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Article} from '../models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article = undefined;
  contents = [];
  @Output() update = new EventEmitter();
  @Output() Delete = new EventEmitter();
  managing = false;
  logged = false;
  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }
  checkLength(len1: number, len2: number): boolean{
    return this.article.content !== null && this.article.content.length >= len1 && this.article.content.length < len2;
  }
  save(): void{
    this.managing = false;
    this.update.emit(this.article);
  }
  delete(): void{
    this.Delete.emit();
  }

  private loadData(): void{
    const token = localStorage.getItem('token');
    if (token){
      this.logged = true;
    }
    if (this.article.content){
      this.contents = this.article.content.split('\n');
    }
  }
}
