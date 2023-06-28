import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center w-3/4">
        <h3 className="mb-14 text-2xl">Login</h3>
        <input
          placeholder="Email"
          className="mb-14 bg-white border-b w-full p-5"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-14 bg-white border-b w-full p-5"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button
          onClick={login}
          className=" w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cool-button"
        >
          Login
        </button>

        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
