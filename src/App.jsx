import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { Routes, Route, useLocation } from "react-router-dom";

import { Register } from "./components/Register";
import { Login } from "./components/Login";

import cloudGuy from "./assets/cloudGuy.svg";
import keyGuy from "./assets/keyGuy.svg";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {user ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <h3 className="mb-10">Welcome, {user.email}</h3>
          <button
            onClick={logout}
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-grow">
          <div className="flex items-center justify-center flex-1 rounded-r-xl shadow-2xl bg-blue-400">
            <img
              src={location.pathname === "/login" ? keyGuy : cloudGuy}
              className="h-auto w-3/4 max-h-full"
              alt="Image"
            />
          </div>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
