'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useDroppable, UseDroppableArguments } from '@dnd-kit/core';
import Link from 'next/link';
import React from 'react';
import { any } from 'zod';

type Props = {
  id: string;
  title: string;
  description?: any;
  count: number;
  data?: UseDroppableArguments['data'];
  onAddClick?: (args: { id: string }) => void;
};

export const KanbanColumn = ({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick,
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({ id, data });

  const onAddClickHandler = () => {
    onAddClick?.({ id });
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px',
        flexBasis: '0',
        flexGrow: '1',
        minWidth: '300px',
      }}
    >
      <div style={{ padding: '12px' }}>
        <div style={{ width: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <p
                  style={{
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {title}
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <p className="text-sm">...</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            {
              <Badge style={{ height: '24px', backgroundColor: '#33aaaa' }}>
                {count}
              </Badge>
            }
            <Link href="/todos/create">
              <Avatar onClick={onAddClickHandler}>
                <AvatarFallback
                  style={{ backgroundColor: '#999', color: '#fff' }}
                >
                  +
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
          {description}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? 'unset' : 'auto',
          border: '2px dashed transparent',
          borderColor: isOver ? '#000040' : 'transparent',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
