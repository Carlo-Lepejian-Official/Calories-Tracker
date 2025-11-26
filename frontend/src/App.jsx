import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "@/components/ui/Button";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
  }, []);

  return (
    <div className="w-full h-screen bg-background dark font-fredoka flex flex-col">
      <Toaster position="top-center" />
      {loggedIn ? (
        <>
          <div className="flex flex-row w-full h-15 items-center justify-end px-5">
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
          <Dashboard />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
