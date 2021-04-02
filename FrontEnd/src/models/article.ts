export class Article{
  constructor(id: number, name: string, content: string, categoriesID: number[]) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.categoriesID = categoriesID;
  }
  static articles: Article[] = [
    new Article(1, 'first', 'content1', [1]),
  ];
  id: number;
  name: string;
  content: string;
  categoriesID: number[];
}
