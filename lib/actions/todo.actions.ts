'use server';

import {
  CreateTodoParams,
  DeleteTodoParams,
  GetAllTodosParams,
  GetRelatedTodosByProjectParams,
  UpdateTodoParams,
} from '@/types';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import User from '../database/models/user.model';
import Todo from '../database/models/todo.model';
import Project from '../database/models/project.model';
import { revalidatePath } from 'next/cache';

const getProjectByName = async (name: string) => {
  return Project.findOne({ name: { $regex: name, $options: 'i' } });
};

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

export async function getAllTodos({
  query,
  limit = 6,
  page,
  project,
}: GetAllTodosParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};
    const projectCondition = project ? await getProjectByName(project) : null;
    const conditions = {
      $and: [
        titleCondition,
        projectCondition ? { project: projectCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const todosQuery = Todo.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const todos = await populateTodo(todosQuery);
    const todosCount = await Todo.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(todos)),
      totalPages: Math.ceil(todosCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function updateTodo({ userId, todo, path }: UpdateTodoParams) {
  try {
    await connectToDatabase();

    const todoToUpdate = await Todo.findById(todo._id);
    if (!todoToUpdate || todoToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todo._id,
      { ...todo, project: todo.projectId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedTodo));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteTodo({ todoId, path }: DeleteTodoParams) {
  try {
    await connectToDatabase();

    const deletedEvent = await Todo.findByIdAndDelete(todoId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getRelatedTodosByProject({
  projectId,
  todoId,
  limit = 3,
  page = 1,
}: GetRelatedTodosByProjectParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ project: projectId }, { _id: { $ne: todoId } }],
    };

    const todosQuery = Todo.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const todos = await populateTodo(todosQuery);
    const todosCount = await Todo.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(todos)),
      totalPages: Math.ceil(todosCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
