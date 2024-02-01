import TodoForm from '@/components/shared/TodoForm';
import { auth } from '@clerk/nextjs';

const CreateTodo = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create todo
        </h3>
      </section>

      <div className="wrapper my-8">
        <TodoForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateTodo;
