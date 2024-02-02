import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import { getAllTodos } from '@/lib/actions/todo.actions';
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@/components/shared/Search';
import ProjectFilter from '@/components/shared/ProjectFilter';

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const project = (searchParams?.project as string) || '';

  const todos = await getAllTodos({
    query: searchText,
    project,
    page,
    limit: 6,
  });

  // AUTO PAGE REFRESH LOGIC IS IN search.tsx
  // SEE CODE BELOW IN COMMENT
  // useEffect(() => {
  //   let currentUrl = currentUrlQuery({
  //     params: searchParams.toString(),
  //   });

  //   router.push(currentUrl, { scroll: false });
  // }, [searchParams, router]);
  // ////////////////////////////////////////

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Create, View, Share: Your Todos, our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Create and maintain your todos, solo or in team.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#todos">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero-goku.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object=center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="todos"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">Overview of todos</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {/* <Filters /> */}
          <Search />
          <ProjectFilter />
        </div>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <SignedIn>
            <Collection
              data={todos?.data}
              emptyTitle="No todos found"
              emptyStateSubtext="Come back later"
              collectionType="All_Todos"
              limit={6}
              page={page}
              totalPages={todos?.totalPages}
            />
          </SignedIn>
          <SignedOut>
            <div className="flex w-32 justify-end gap-3">
              <Button asChild className="rounded-full" size="lg">
                <Link href="/sign-in">Login</Link>
              </Button>
            </div>
          </SignedOut>
        </div>
      </section>
    </>
  );
}
