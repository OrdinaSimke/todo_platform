'use client';

import React from 'react';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        // width: 'calc(100% + 64px)',

        display: 'flex',
        justifyContent: 'column',

        // margin: '-32px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '32px',
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const KanbanBoard = ({ children }: React.PropsWithChildren) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );
  return <DndContext sensors={sensors}>{children}</DndContext>;
};
