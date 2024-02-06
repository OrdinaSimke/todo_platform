import ZoomImage from '@/components/shared/ZoomImage';
import {
  getTodoById,
  getRelatedTodosByProject,
} from '@/lib/actions/todo.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import { DeleteConfirmation } from '@/components/shared/DeleteConfirmation';
import { MarkCompleteConfirmation } from '@/components/shared/MarkCompleteConfirmation';
import Collection from '@/components/shared/Collection';

// export const revalidate = 0;

const TodoDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const todo = await getTodoById(id);
  const page = Number(searchParams?.page) || 1;
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isTodoCreator = userId === todo?.organizer?._id.toString();

  const relatedTodos = await getRelatedTodosByProject({
    projectId: todo.project._id,
    todoId: todo._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain ">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl w-full">
          <ZoomImage
            src={todo?.imageUrl ? todo.imageUrl : '/assets/icons/no-image.svg'}
            alt="todo image"
            className="h-full min-h-[300px] object-contain object-center cursor-pointer md:p-4 p-2 block ml-auto mr-auto"
            width={todo?.imageUrl ? 1000 : 200}
            height={todo?.imageUrl ? 1000 : 200}
          />

          <div className="flex flex-col gap-8 p-5 md:p-10 ">
            <div className="flex flex-col gap-6">
              <div className="flex">
                <h2 className="h2-bold w-11/12">{todo.title}</h2>

                {isTodoCreator && (
                  <div className="right-5 flex ml-auto flex-col gap-4 rounded-xl p-3 w-1/12">
                    <Link href={`/todos/${todo._id}/update`}>
                      <Image
                        src="/assets/icons/edit.svg"
                        alt="edit"
                        width={20}
                        height={20}
                      />
                    </Link>

                    <DeleteConfirmation todoId={todo._id} />
                    <MarkCompleteConfirmation
                      todoId={todo._id}
                      todo={todo}
                      userId={userId}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center ">
                <div className="flex gap-3">
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {todo.project.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{' '}
                  <span className="text-primary-500">
                    {todo.organizer.firstName} {todo.organizer.lastName}
                  </span>
                </p>
              </div>

              {todo.startDateTime && (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 md:gap-3">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={32}
                      height={32}
                      style={{
                        filter:
                          'invert(100%) sepia(100%) saturate(10000%) hue-rotate(180deg)',
                      }}
                    />

                    <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                      <p
                        className="pr-2"
                        style={{ color: '#006D6E', width: 140 }}
                      >
                        Start
                      </p>
                      <p>
                        {formatDateTime(todo.startDateTime).dateOnly} -{' '}
                        {formatDateTime(todo.startDateTime).timeOnly}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {todo.deadline && (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 md:gap-3">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={32}
                      height={32}
                    />

                    <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                      <p
                        className="pr-2"
                        style={{ color: '#FA776C', width: 140 }}
                      >
                        Deadline
                      </p>
                      <p>
                        {formatDateTime(todo.deadline).dateOnly} -{' '}
                        {formatDateTime(todo.deadline).timeOnly}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <p className="p-bold-20 text-grey-600">Description:</p>
                <p className="p-medium-16 lg:p-regular-18 whitespace-pre-wrap">
                  {todo.description}
                </p>
                <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                  <a href={todo.url} target="_blank">
                    {todo.url}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related todos</h2>
        <Collection
          data={relatedTodos?.data}
          emptyTitle="No todos found"
          emptyStateSubtext="Come back later"
          collectionType="Related_Todos"
          limit={3}
          page={page}
          totalPages={relatedTodos?.totalPages}
        />
      </section>
    </>
  );
};

export default TodoDetails;
