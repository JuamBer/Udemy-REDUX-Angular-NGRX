import { Pipe, PipeTransform } from '@angular/core';
import { FiltersType } from 'src/app/filter/state/filter.type';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: FiltersType): Todo[] {
    switch (filter){
      case 'completados':
        return todos.filter(todo => todo.completed)
      case 'pendientes':
        return todos.filter(todo => !todo.completed)
      default:
        return todos;
    }
  }

}
