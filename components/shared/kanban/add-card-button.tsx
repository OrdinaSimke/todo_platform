import { Button } from '@/components/ui/button';
import React from 'react';

interface Props {
  onClick: () => void;
}

/** Render a button that allows you to add a new card to a column.
 *
 * @param onClick - a function that is called when the button is clicked.
 * @returns a button that allows you to add a new card to a column.
 */
export const KanbanAddCardButton = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <Button
      style={{
        margin: '16px',
      }}
      onClick={onClick}
    >
      {children ?? <p>Add new card</p>}
    </Button>
  );
};
