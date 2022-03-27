export class Todo {
  public id: number;
  public text: string;
  public completed: boolean;

  constructor(text: string){
    this.id = Math.random();
    this.text = text;
    this.completed = false;
  }
}
