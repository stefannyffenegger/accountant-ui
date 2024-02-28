import Link from "next/link";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <>
      <div className="h-full">
        <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
          <div className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Sign in
                  </h1>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>Don't have an account yet?</p>
                    <Link
                      className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="/register"
                    >
                      Sign up here
                    </Link>
                  </div>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
