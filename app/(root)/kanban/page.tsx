import KanbanCollection from '@/components/shared/kanban/collection';
import { getAllStages } from '@/lib/actions/stage.actions';
import { getAllTodos } from '@/lib/actions/todo.actions';
import { getAllUsers } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import React from 'react';

const UpdateTodo = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const searchText = '';
  const project = '';
  const page = 1;
  const limit = 999;
  const status = 'Open';

  const todos = await getAllTodos({
    query: searchText,
    project,
    page,
    status,
    limit,
  });

  const stages = await getAllStages();

  const users = await getAllUsers();

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py10">
        <KanbanCollection
          todos={todos}
          stages={stages}
          users={users}
          currentUserId={userId}
        ></KanbanCollection>
      </section>
    </>
  );
};

export default UpdateTodo;
