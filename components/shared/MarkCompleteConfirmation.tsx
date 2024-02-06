'use client';

import { useTransition } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { updateTodo } from '@/lib/actions/todo.actions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { currentUrlQuery } from '@/lib/utils';

export const MarkCompleteConfirmation = ({
  todoId,
  todo,
  userId,
}: {
  todoId: string;
  todo: any;
  userId: any;
}) => {
  let [isPending, startTransition] = useTransition();
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src={
            todo.isCompleted
              ? '/assets/icons/unlock.svg'
              : '/assets/icons/lock.svg'
          }
          alt="edit"
          width={20}
          height={20}
          title={todo.isCompleted ? 'Open todo' : 'Close todo'}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to mark this todo as{' '}
            {todo.isCompleted ? 'open' : 'completed'}?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            {todo.isCompleted
              ? 'This will show the todo in the list'
              : 'This will hide the todo from the list'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                if (!todoId) {
                  router.back();
                  return;
                }

                const todoCompletion = todo?.isCompleted
                  ? !todo.isCompleted
                  : true;

                try {
                  const currentUrl = currentUrlQuery({
                    params: searchParams.toString(),
                  });
                  const { project, ...tmpTodo } = todo;
                  const updatedTodo = await updateTodo({
                    userId,
                    todo: {
                      ...tmpTodo,
                      projectId: todo?.project?._id,
                      isCompleted: todoCompletion,
                    },
                    path: currentUrl,
                  });

                  if (updatedTodo) {
                    toast('Todo has been updated', {
                      description: 'Jep jep',
                      // action: {
                      //   label: 'Undo',
                      //   onClick: () => console.log('Undo'),
                      // },
                    });
                  }
                  // if (updatedTodo) {
                  //   // router.push(`/todos/${updatedTodo._id}`);
                  //   //router.push(currentUrl, { scroll: false });
                  //   console.log(currentUrl);
                  // }
                } catch (error) {
                  console.log(error);
                }
              })
            }
          >
            {isPending ? 'Updating...' : 'Update'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
