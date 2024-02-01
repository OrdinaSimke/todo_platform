import {
  getTodoById,
  getRelatedTodosByProject,
} from '@/lib/actions/todo.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';

const TodoDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const todo = await getTodoById(id);

  const relatedTodos = await getRelatedTodosByProject({
    projectId: todo.project._id,
    todoId: todo._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          {todo.imageUrl && (
            <Image
              src={todo.imageUrl}
              alt="todo image"
              width={1000}
              height={1000}
              className="h-full min-h-[300px] object-contain object-center"
            />
          )}

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{todo.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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

              <div className="flex flex-col gap-3">
                <div className="flex gap-2 md:gap-3">
                  <Image
                    src="/assets/icons/calendar.svg"
                    alt="calendar"
                    width={32}
                    height={32}
                  />
                  <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                    <p>
                      {formatDateTime(todo.startDateTime).dateOnly} -{' '}
                      {formatDateTime(todo.startDateTime).timeOnly}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="p-bold-20 text-grey-600">Description:</p>
                <p className="p-medium-16 lg:p-regular-18">
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
    </>
  );
};

export default TodoDetails;
