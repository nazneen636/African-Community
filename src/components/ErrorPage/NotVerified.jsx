// NotVerified.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotVerified = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-l from-[#265038] to-[#796101]">
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Email not verified</h2>
        <p className="mb-3">
          Please check your inbox and verify your email to continue.
        </p>
        <p className="text-sm italic">(Also check your spam or junk folder.)</p>
        <div className="mt-5 flex gap-4 items-center justify-center">
          <Link
            to="/"
            className="inline-block bg-bg-green326548 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Go to Home Page
          </Link>
          <Link
            to="/signin"
            className="inline-block bg-bg-green326548 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Go to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
