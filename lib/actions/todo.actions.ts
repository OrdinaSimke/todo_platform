'use server';

import { CreateTodoParams } from '@/types';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import User from '../database/models/user.model';
import Todo from '../database/models/todo.model';
export const createTodo = async ({ todo, userId, path }: CreateTodoParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error('Organizer not found');
    }

    console.log({
      projectId: todo.projectId,
      organizerId: userId,
    });
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
