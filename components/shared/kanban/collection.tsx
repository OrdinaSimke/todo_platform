'use client';

import {
  KanbanBoardContainer,
  KanbanBoard,
} from '@/components/shared/kanban/board';
import KanbanColumn from '@/components/shared/kanban/column';
import KanbanItem from '@/components/shared/kanban/item';
import { Children, useMemo } from 'react';
import TodoCard from './card';
import { KanbanAddCardButton } from './add-card-button';
import { DragEndEvent } from '@dnd-kit/core';
import { updatePartOfTodo } from '@/lib/actions/todo.actions';

const KanbanCollection = ({
  children,
  todos,
  stages,
  users,
  currentUserId,
}: any) => {
  const todoStages = useMemo(() => {
    if (!todos?.data || !stages?.data) {
      return {
        todoStage: [],
        stages: [],
      };
    }

    const todoStage = todos.data.filter(
      (todo: any) =>
        todo.stageId === undefined ||
        todo.stageId === null ||
        todo.stageId === ''
    );

    const grouped: any[] = stages.data.map((stage: any) => ({
      ...stage,
      todos: todos.data.filter((todo: any) => {
        let condition;
        if (stage.name === 'Todo') {
          return (
            todo.stageId === undefined ||
            todo.stageId?.toString() === stage.name
          );
        }

        return todo.stageId?.toString() === stage.name;
      }),
    }));

    return { todoStage, columns: grouped };
  }, [stages, todos]);

  const handleAddCard = (args: { stageId: string }) => {};

  const handleOnDragEnd = async (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const todoId = event.active.id as string;
    const todoStageId = event.active.data.current?.stageId;

    if (todoStageId === stageId) return;

    try {
      const updatedTodo = await updatePartOfTodo({
        todoId: todoId,
        params: { stageId: stageId },
        path: '/kanban',
      });

      if (updatedTodo) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          {todoStages.columns?.map((column) => {
            return (
              <KanbanColumn
                key={column.name}
                id={column.name}
                title={column.name}
                count={column.todos.length}
                onAddClick={() => handleAddCard({ stageId: column.name })}
              >
                {column.todos.map((todo: any) => {
                  return (
                    <KanbanItem
                      key={todo._id}
                      id={todo._id}
                      data={{ ...todo, stageId: column.name }}
                    >
                      <TodoCard
                        {...todo}
                        users={users}
                        currentUserId={currentUserId}
                      />
                    </KanbanItem>
                  );
                })}
                {!column.todos.length && (
                  <KanbanAddCardButton
                    onClick={() => handleAddCard({ stageId: column.name })}
                  />
                )}
              </KanbanColumn>
            );
          })}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

export default KanbanCollection;
