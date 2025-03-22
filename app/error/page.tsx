import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 from-0% via-teal-50 via-50% to-sky-300 to-100%">
      <div className="w-80 md:w-[400px] p-8 bg-white rounded-lg shadow-2xl">
        <div className="mb-2 text-3xl font-bold text-center text-gray-800">
          Sorry, something went wrong.
        </div>
        <Link href="/">
          <button className="font-semibold text-lg flex items-center justify-center w-full px-4 py-3 mt-8 text-white bg-gray-800 rounded-md hover:bg-gray-700">
            Go to top
          </button>
        </Link>
      </div>
    </div>
  );
}
