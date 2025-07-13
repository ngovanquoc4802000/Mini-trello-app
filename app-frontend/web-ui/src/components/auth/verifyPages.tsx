function VerifyPage() {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Email Verification
      </h1>
      <p className="text-gray-600 mb-8 text-base md:text-lg">
        Please enter your code that send to your email address
      </p>
      <div>
        <input
          type="text"
          placeholder="Enter verification code"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-base md:text-lg"
        />
      </div>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-semibold text-lg md:text-xl transition duration-300">
        Submit
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
  );
}

export default VerifyPage;
