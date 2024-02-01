import { ITodo } from '@/lib/database/models/todo.model';
import React from 'react';

type CollectionProps = {
  data: ITodo[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  collectionType?: 'Todos_Organized' | 'My_Todos' | 'All_Todos';
  urlParamName?: string;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  limit,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return <div>Collection</div>;
};

export default Collection;
