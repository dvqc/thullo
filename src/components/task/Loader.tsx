import { Skeleton } from "../commons";

export default function Loader() {
  return (
    <div className="w-screen max-w-2xl ">
      <Skeleton className="h-36 rounded-xl"></Skeleton>

      <section className="mt-6 flex justify-between">
        <section className="w-full max-w-md">
          <div className="my-6 space-y-2">
            <Skeleton className="h-5 w-48"></Skeleton>
            <Skeleton className="h-4 w-14"></Skeleton>
          </div>
          <div className="my-6 w-full space-y-2">
            <Skeleton className="h-3"></Skeleton>
            <Skeleton className="h-3"></Skeleton>
            <Skeleton className="h-3"></Skeleton>
            <Skeleton className="h-3 w-3/4"></Skeleton>
          </div>
          <article className="my-6">
            <Skeleton className="h-4 w-14"></Skeleton>
            <div className="my-6 w-full space-y-2">
              <div className="flex items-center">
                <Skeleton className="h-14 w-20"></Skeleton>
                <div className="ml-6 w-full space-y-2">
                  <Skeleton className="h-3 w-20"></Skeleton>
                  <Skeleton className="h-3"></Skeleton>
                </div>
              </div>
              <div className="flex items-center">
                <Skeleton className="h-14 w-20"></Skeleton>
                <div className="ml-6 w-full space-y-2">
                  <Skeleton className="h-3 w-20"></Skeleton>
                  <Skeleton className="h-3"></Skeleton>
                </div>
              </div>
            </div>
            <div className="my-6">
              <Skeleton className="h-14"></Skeleton>
            </div>
          </article>
        </section>
        <section className="w-36">
          <div className="my-4 space-y-4">
            <Skeleton className="h-6"></Skeleton>
            <Skeleton className="h-6"></Skeleton>
            <Skeleton className="h-6"></Skeleton>
          </div>
        </section>
      </section>
    </div>
  );
}
