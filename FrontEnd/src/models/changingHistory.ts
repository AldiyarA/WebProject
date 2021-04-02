export class ChangingHistory{
  constructor(userId: number, articleId: number, categoryId: number[], changeType: string, massage: string) {
    this.userId = userId;
    this.articleId = articleId;
    this.categoryId = categoryId;
    this.changeType = changeType;
    this.massage = massage;
    this.date = new Date();
  }
  static changingHistories: ChangingHistory[];
  userId: number;
  articleId: number;
  categoryId: number[];
  changeType: string;
  massage: string;
  date: Date;
}
