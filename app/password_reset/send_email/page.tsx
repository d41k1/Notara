import React from "react";
import { sendEmail } from "./actions";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 from-0% via-teal-50 via-50% to-sky-300 to-100%">
      <form>
        <div className="w-80 md:w-[400px] p-8 bg-white rounded-lg shadow-2xl">
          <div className="mb-8 text-3xl font-bold text-center text-gray-800 flex justify-center">
            Please enter your email
          </div>
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
          <button
            formAction={sendEmail}
            className="flex items-center justify-center w-full px-4 py-3 mt-8 text-white bg-gray-800 rounded-md hover:bg-gray-700"
          >
            Send a password reset request
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
