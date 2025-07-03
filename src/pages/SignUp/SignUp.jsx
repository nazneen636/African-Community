import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { AuthContext } from "../../Context/AuthContext";
import { onChangeHandler } from "../../utils/OnChangeHandler.utils";
import { handleValidation } from "../../utils/Validation.utils";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../Context/AuthContext";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const [loading, setLoading] = useState(false);
  // const { signUp, loading } = useContext(AuthContext);
  const { signUp, loading } = useAuth();

  // handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = userInfo;
    const isValid = handleValidation(userInfo, setError);
    if (!isValid) return;
    try {
      await signUp(email, password, name);
      console.log("Registration Successful");
    } catch (err) {
      console.error("Sign up error", err.message);
    } finally {
      setUserInfo({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-[#326548] to-[#FBCA01] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={(e) => onChangeHandler(e, setUserInfo, setError)}
                placeholder="Your name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326548]"
              />
              {error.nameError && (
                <p className="absolute left-0 top-full text-red-600 text-sm">
                  {error.nameError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={(e) => onChangeHandler(e, setUserInfo, setError)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326548]"
              />
              {error.emailError && (
                <p className="absolute left-0 top-full text-red-600 text-base">
                  {error.emailError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={(e) => onChangeHandler(e, setUserInfo, setError)}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326548]"
              />
              {error.passwordError && (
                <p className="absolute left-0 top-full text-red-600 text-base">
                  {error.passwordError}
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <button className="w-full mt-2 bg-[#326548] text-white py-2 rounded-lg hover:bg-[#274f3a] transition duration-200">
              <ClipLoader
                color="#760c0c"
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={1}
              />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full mt-2 bg-[#326548] text-white py-2 rounded-lg hover:bg-[#274f3a] transition duration-200"
            >
              Sign Up
            </button>
          )}
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <a
            href="/signin"
            className="text-[#326548] font-medium hover:underline ml-1"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
