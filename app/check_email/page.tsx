import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 from-0% via-teal-50 via-50% to-sky-300 to-100%">
      <div className="w-80 md:w-[400px] p-8 bg-white rounded-lg shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-gray-800">Check Your Email</h1>
        <p className="mt-4 text-gray-600">
          We’ve sent a confirmation email. Please check your inbox and click the
          verification link.
        </p>
        <p className="mt-2 text-gray-500">
          If you don’t see the email, check your spam folder.
        </p>
        <Link href="/">
          <button className="flex items-center justify-center w-full px-4 py-3 mt-8 text-white bg-gray-800 rounded-md hover:bg-gray-700">
            Go to top
          </button>
        </Link>
      </div>
    </div>
  );
}
