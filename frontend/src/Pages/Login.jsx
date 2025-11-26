import { SignIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/Button";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleSignin = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  return (
    <div className="w-full min-h-screen flex flex-row">
      {/* Welcome text */}
      <div className="flex flex-col h-screen items-center justify-center gap-4 flex-1">
        <h1 className="text-8xl text-primary text-center">Welcome!</h1>
        <p className="text-4xl text-muted-foreground text-center">
          Track your calories and stay on track effortlessly with everything you
          need and nothing you don't!
        </p>
      </div>

      {/* Login */}
      <div className="h-screen flex flex-col justify-center items-center text-primary flex-1">
        <Button onClick={handleSignin}>Sign in with Google</Button>
      </div>
    </div>
  );
};

export default Login;
