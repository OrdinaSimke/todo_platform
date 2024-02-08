'use client';

import {
  KanbanBoardContainer,
  KanbanBoard,
} from '@/components/shared/kanban/board';
import KanbanColumn from '@/components/shared/kanban/column';
import KanbanItem from '@/components/shared/kanban/item';
import { useMemo } from 'react';
import TodoCard from './card';
import { KanbanAddCardButton } from './add-card-button';

const KanbanCollection = ({ todos, stages }: any) => {
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

  return (
    <KanbanBoardContainer>
      <KanbanBoard>
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
                    <TodoCard {...todo} dueDate={todo.deadline || undefined} />
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
  );
};

export default KanbanCollection;
