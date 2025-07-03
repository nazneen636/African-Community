// NotSignedIn.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotSignedIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-yellow-100  shadow-lg rounded-xl p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          You're not signed in
        </h2>
        <p className="text-gray-600 mb-6">
          Please sign in to access this page.
        </p>
        <Link
          to="/signin"
          className="inline-block bg-bg-green326548 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
};

export default NotSignedIn;
