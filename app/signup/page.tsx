import { signup } from "./actions";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 from-0% via-teal-50 via-50% to-sky-300 to-100%">
      <form>
        <div className="w-80 md:w-[400px] px-8 pt-8 pb-10 bg-white rounded-lg shadow-2xl">
          <div className="mb-8 text-3xl font-bold text-center text-gray-800">
            Sing Up
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              formAction={signup}
              className="mt-6 mb-6 font-medium text-lg flex items-center justify-center w-full px-4 py-3 text-white bg-gray-800 rounded-md hover:bg-gray-700"
            >
              Sign up
            </button>
          </div>
          <Link href="/login">
            <div className="underline text-sm w-full flex justify-center">
              If you have a GitHub or Google account, click here
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}
