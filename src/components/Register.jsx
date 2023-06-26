import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

import { Link } from "react-router-dom";
import { Login } from "./Login";

export const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [showLogin, setShowLogin] = useState(false);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center w-3/4">
        <h3 className="mb-14 text-2xl">Create Account</h3>
        <input
          placeholder="Email"
          className="mb-14 bg-white border-b w-full p-5"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-14 bg-white border-b w-full p-5"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

<button
          onClick={register}
          className="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create User
        </button>

        <p className="mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            onClick={() => setShowLogin(true)}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
