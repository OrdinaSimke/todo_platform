'use server';

import { CreateStageParams } from '@/types';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Stage from '../database/models/stage.model';

export const createStage = async ({ name }: CreateStageParams) => {
  try {
    await connectToDatabase();

    const newStage = await Stage.create({ name: name });

    return JSON.parse(JSON.stringify(newStage));
  } catch (error) {
    handleError(error);
  }
};

export const getAllStages = async () => {
  try {
    await connectToDatabase();

    const stages = await Stage.find();

    return {
      data: JSON.parse(JSON.stringify(stages)),
    };
  } catch (error) {
    handleError(error);
  }
};
