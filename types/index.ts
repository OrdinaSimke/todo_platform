// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== EVENT PARAMS
export type CreateTodoParams = {
  userId: string;
  todo: {
    title: string;
    description: string;
    imageUrl: string;
    startDateTime?: Date;
    endDateTime?: Date;
    deadline?: Date;
    estimatedHours: number;
    isPrivate: boolean;
    isCompleted: boolean;
    projectId: string;
    url: string;
  };
  path: string;
};

export type UpdateTodoParams = {
  userId: string;
  todo: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    startDateTime?: Date;
    endDateTime?: Date;
    deadline?: Date;
    estimatedHours: number;
    isPrivate: boolean;
    isCompleted: boolean;
    projectId: string;
    url: string;
  };
  path?: string;
};

export type DeleteTodoParams = {
  todoId: string;
  path: string;
};

export type GetAllTodosParams = {
  query: string;
  project: string;
  limit: number;
  page: number;
  status: string;
  path?: string;
};

export type GetTodosByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedTodosByProjectParams = {
  projectId: string;
  todoId: string;
  limit?: number;
  page: number | string;
};

export type Todo = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  startDateTime?: Date;
  endDateTime?: Date;
  deadline?: Date;
  estimatedHours: string;
  isPrivate: boolean;
  isCompleted: boolean;
  projectId: string;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  project: {
    _id: string;
    name: string;
  };
};

// ====== PROJECT PARAMS
export type CreateProjectParams = {
  projectName: string;
};

// ====== STAGE PARAMS
export type CreateStageParams = {
  name: string;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
  keysToRemove: string[];
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type CurrentUrlQueryParams = {
  params: string;
};
