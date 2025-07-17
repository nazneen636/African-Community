import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
// import { AuthContext } from "../../Context/AuthContext";
import { onChangeHandler } from "../../utils/OnChangeHandler.utils";
// import { useNavigate } from "react-router-dom";
// import lib from "../../lib/lib";
import { ClipLoader } from "react-spinners";
import { handleValidation } from "../../utils/Validation.utils";
import { useAuth } from "../../Context/AuthContext";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
const SignIn = () => {
  // const { signIn, GoogleSignIn, loading } = useContext(AuthContext);
  const { signIn, GoogleSignIn, loading } = useAuth();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  // handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    const isValid = handleValidation(loginInfo, setError);
    if (!isValid) return;
    try {
      await signIn(email, password);
      console.log("login successful");
    } catch (error) {
      throw new Error("Login failed", error);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignIn();
    } catch (error) {
      console.log("Google sign in error", error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-[#FBCA01] to-[#326548] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Sign In to Your Account
        </h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={loginInfo.email}
                onChange={(e) => onChangeHandler(e, setLoginInfo, setError)}
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326548]"
              />
              {error.emailError && (
                <p className="absolute capitalize left-0 top-full text-sm text-red-600">
                  {error.emailError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mt-6 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                onChange={(e) => onChangeHandler(e, setLoginInfo, setError)}
                value={loginInfo.password}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326548]"
              />
              {error.passwordError && (
                <p className="absolute capitalize left-0 top-full text-sm text-red-600">
                  {error.passwordError}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#326548]" />
              Remember me
            </label>
            <a href="#" className="hover:underline text-[#326548]">
              Forgot password?
            </a>
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
              Sign In
            </button>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <hr className="flex-1 border-gray-300" />
          Or
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle className="text-xl" />
          <span className="text-gray-700">Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?
          <a
            href="/signup"
            className="text-[#326548] font-medium hover:underline ml-1"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
