import { HeaderLayout } from "~/components/layouts";

export default function Custom403() {
  return (
    <HeaderLayout>
      <main className="flex h-full flex-col items-center justify-center space-y-6">
        <h1 className="text-xl text-red-500">403 | Access Denied</h1>
        <p>
          You do not have permission to access this page. Please contact the website administrator if you believe this
          is an error.
        </p>
      </main>
    </HeaderLayout>
  );
}
