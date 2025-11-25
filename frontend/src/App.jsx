import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="w-full h-screen bg-background dark font-fredoka flex flex-col">
      <Toaster position="top-center" />
      <SignedOut>
        <Login />
      </SignedOut>
      <SignedIn>
        <div className="flex flex-row w-full h-15 items-center justify-end px-5">
          <UserButton />
        </div>
        <Dashboard />
      </SignedIn>
    </div>
  );
}

export default App;
