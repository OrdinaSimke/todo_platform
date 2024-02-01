import { getTodoById } from '@/lib/actions/todo.actions';
import { SearchParamProps } from '@/types';
import React from 'react';

const TodoDetails = async ({ params: { id } }: SearchParamProps) => {
  console.log('id', id);
  const todo = await getTodoById(id);

  console.log('todo', todo);
  return <div>page</div>;
};

export default TodoDetails;
