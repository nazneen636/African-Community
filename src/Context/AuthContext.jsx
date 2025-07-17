import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import React, { use, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import lib from "../lib/lib";
import { GoogleAuthProvider } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // sign up
  const signUp = async (email, password, name) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name
      );
      const user = userCredential.user;
      console.log("Registration successful", user);
      lib.SuccessToast("Registration successful");
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "",
      });
      await push(ref(db, "users/"), {
        userName: auth.currentUser.displayName || name,
        userEmail: auth.currentUser.email || email,
        profile_picture: auth.currentUser.photoURL || "profile missing",
        userUid: auth.currentUser.uid,
      });
      await sendEmailVerification(auth.currentUser);
      lib.InfoToast("Verification mail send");
    } catch (err) {
      console.error(err.code);
    } finally {
      setLoading(false);
    }
  };

  // sign in
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
      console.log("Login successful", userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      lib.ErrorToast("Login failed", error.code);
      console.error(errorCode);
    } finally {
      setLoading(false);
    }
  };

  // google sign in
  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userInfo = await signInWithPopup(auth, provider);
      const user = userInfo.user;
      console.log(user, "user");
      navigate("/");
      await push(ref(db, "users/"), {
        userName: auth.currentUser.displayName || "Name missing",
        userEmail: auth.currentUser.email || "Email missing",
        profile_picture: auth.currentUser.photoURL || "profile missing",
        userUid: auth.currentUser.uid,
      });
      console.log(userInfo.user);
    } catch (error) {
      lib.ErrorToast("Google sign in error", error.message);
      console.error("Google sign in error", error.message);
    } finally {
      setLoading(false);
    }
  };
  // logout
  const logOut = () => {
    signOut(auth);
  };

  // get use avatar
  const getUserAvatar = () => {
    if (auth.currentUser) {
      const { photoURL, displayName } = auth.currentUser;
      if (photoURL && photoURL.startsWith("http")) {
        return photoURL;
      } else if (displayName) {
        // first letter of first word
        // return displayName.split(" ")[0][0].toUpperCase();

        // Each letter of Each word
        return displayName
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase();
      }
    }
    return "U"; // fallback letter
  };

  // detect current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsVerified(user.emailVerified);
      } else {
        setUser(null);
        setIsVerified(false);
      }
    });
    return () => unSubscribe();
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isVerified,
        loading,
        setLoading,
        signUp,
        signIn,
        logOut,
        GoogleSignIn,
        userAvatar: getUserAvatar(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
