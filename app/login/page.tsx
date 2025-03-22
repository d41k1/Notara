import { login, LoginWithGithub, LoginWithGoogle } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 from-0% via-teal-50 via-50% to-sky-300 to-100%">
      <form>
        <div className="w-80 md:w-[400px] p-8 bg-white rounded-lg shadow-2xl">
          <div className="mb-8 text-3xl font-bold text-center text-gray-800">
            Sign in to Notara
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                formAction={LoginWithGithub}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                    fill="currentColor"
                  />
                </svg>
                GitHub
              </button>
              <button
                formAction={LoginWithGoogle}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg
                  className="h-6 w-6 mx-2"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns-xlink="http://www.w3.org/1999/xlink"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  <title>Google-color</title> <desc>Created with Sketch.</desc>
                  <defs> </defs>
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        ></path>
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                Google
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 bg-white">or</span>
              <div className="w-full border-t border-gray-300"></div>
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
                />
              </div>
              <button
                formAction={login}
                className="mt-6 font-medium text-lg flex items-center justify-center w-full px-4 py-3 text-white bg-gray-800 rounded-md hover:bg-gray-700"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
