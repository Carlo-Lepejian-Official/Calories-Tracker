import { useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [loggedIn, _setLoggedIn] = useState(true);

  return (
    <div className="w-full min-h-screen bg-background dark font-fredoka">
      {loggedIn ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
