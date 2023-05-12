import { HeaderLayout } from "~/components/layouts";

export default function Custom403() {
  return (
    <HeaderLayout>
      <main className="flex h-full flex-col items-center justify-center space-y-6">
        <h1 className="text-xl text-red-500">404 | Page Not Found</h1>
        <p>
          The requested page could not be found. Please check the URL and try again or contact the website administrator
          for assistance.
        </p>
      </main>
    </HeaderLayout>
  );
}
