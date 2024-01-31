import MobileNav from '@/components/shared/MobileNav';
import NavItems from '@/components/shared/NavItems';
import { Button } from '@/components/ui/button';
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
            src="/assets/images/hero.png"
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
        <h2 className="h2-bold">Trusted by 1000 of users</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <div className="flex w-32 justify-end gap-3">
            <SignedIn>Table</SignedIn>
            <SignedOut>
              <Button asChild className="rounded-full" size="lg">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </>
  );
}
