function LoginPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-sm w-full text-center">
        <div className="flex justify-center mb-6">
          <svg
            className="h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-9 4h6m-3-3v6"
            ></path>
          </svg>
        </div>

        <p className="text-gray-700 mb-8 text-base md:text-lg">
          Log in to continue
        </p>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-base md:text-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-semibold text-lg md:text-xl transition duration-300">
          Continue
        </button>

        <div className="mt-8 text-sm text-gray-500">
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          <p className="mt-2 text-xs md:text-sm leading-relaxed">
            This site is protected by reCAPTCHA and the Google
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
