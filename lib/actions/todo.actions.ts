'use server';

import { CreateTodoParams } from '@/types';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import User from '../database/models/user.model';
import Todo from '../database/models/todo.model';
import Project from '../database/models/project.model';

const populateTodo = async (query: any) => {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({ path: 'project', model: Project, select: '_id name' });
};

export const createTodo = async ({ todo, userId, path }: CreateTodoParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error('Organizer not found');
    }

    const newTodo = await Todo.create({
      ...todo,
      project: todo.projectId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newTodo));
  } catch (error) {
    handleError(error);
  }
};

export const getTodoById = async (todoId: string) => {
  try {
    await connectToDatabase();

    const todo = await populateTodo(Todo.findById(todoId));

    if (!todo) {
      throw new Error('Todo not found');
    }

    return JSON.parse(JSON.stringify(todo));
  } catch (error) {
    handleError(error);
  }
};
