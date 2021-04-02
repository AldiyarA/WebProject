export class Category{
  static cnt = 1;
  constructor(name: string = 'new Category', content: string = '', categoriesID: number[] = []) {
    this.id = (Category.cnt++);
    this.name = name;
    this.content = content;
    this.categoriesID = categoriesID;
  }
  static categories: Category[] = [
    new Category('first', 'content1', [2, 3]),
    new Category('second', 'content2', [4]),
    new Category('third', 'content3', []),
    new Category('fourth', 'content4', []),
  ];
  id: number;
  name: string;
  content: string;
  categoriesID: number[];
  static newCategory(): number{
    const category = new Category();
    Category.categories.push(category);
    return category.id;
  }
}
export function deleteCategory(id: number): void{
  const category = Category.categories.find(x => x.id === id);
  Category.categories = Category.categories.filter(x => x.id !== id);
  if (!category) { return; }
  for (const childId of category.categoriesID){
    deleteCategory(childId);
  }
}
