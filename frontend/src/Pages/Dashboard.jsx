import React from "react";
import { CircularProgress } from "@heroui/progress";
import CircularProgressBar from "../components/CircularProgressBar";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <CircularProgressBar value={25} max={100} size={140} strokeWidth={12} />
    </div>
  );
};

export default Dashboard;
