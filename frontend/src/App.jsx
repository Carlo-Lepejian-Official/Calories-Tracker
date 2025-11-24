import { useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <div className="w-full min-h-screen bg-background dark font-fredoka">
      <SignedOut>
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  );
}

export default App;
