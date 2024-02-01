'use server';

import { CreateProjectParams } from '@/types';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Project from '../database/models/project.model';

export const createProject = async ({ projectName }: CreateProjectParams) => {
  try {
    await connectToDatabase();

    const newProject = await Project.create({ name: projectName });

    return JSON.parse(JSON.stringify(newProject));
  } catch (error) {
    handleError(error);
  }
};

export const getAllProjects = async () => {
  try {
    await connectToDatabase();

    const projects = await Project.find();

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    handleError(error);
  }
};
