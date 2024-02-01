import TodoForm from '@/components/shared/TodoForm';
import { getTodoById } from '@/lib/actions/todo.actions';
import { auth } from '@clerk/nextjs';

type UpdateTodoProps = {
  id: string;
};

const UpdateTodo = async ({ params: { id } }: UpdateTodoProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const todo = await getTodoById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update todo
        </h3>
      </section>

      <div className="wrapper my-8">
        <TodoForm type="Update" userId={userId} todoId={todo._id} todo={todo} />
      </div>
    </>
  );
};

export default UpdateTodo;
