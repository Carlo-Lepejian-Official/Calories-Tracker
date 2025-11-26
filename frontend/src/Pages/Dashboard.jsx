import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import CalorieEntriesTable from "../components/CalorieEntriesTable";
import { Separator } from "@/components/ui/separator";
import CalorieEntry from "../components/CalorieEntry";
import EditDailyCalories from "../components/EditDailyCalories";
import api from "../lib/api.js";
import { auth } from "../lib/firebase.js";

const Dashboard = () => {
  const [dailyCalories, setDailyCalories] = useState(2000);
  const calorieEntries = [
    {
      Id: 1,
      Date: 1763879627,
      Calories: 200,
    },
    {
      Id: 2,
      Date: 1763879629,
      Calories: 250,
    },
    {
      Id: 3,
      Date: 1763879635,
      Calories: 500,
    },
  ];

  useEffect(() => {
    const updateDailyCalories = async () => {
      const token = await auth.currentUser.getIdToken();
      const res = await api.get("http://localhost:3000/api/daily-calories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDailyCalories(res.data);
    };
    updateDailyCalories();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-15">
        <div className="flex flex-col gap-4">
          <h1 className="text-8xl text-foreground text-center">
            {dailyCalories}
            <span className="text-5xl text-muted-foreground"> left</span>
          </h1>
          <Progress
            value={0}
            indicatorprops={0 > dailyCalories ? "bg-red-500" : "bg-green-500"}
          />
          <div className="flex flex-row items-center justify-center gap-5">
            <EditDailyCalories
              dailyCalories={dailyCalories}
              setDailyCalories={setDailyCalories}
            />
            <CalorieEntry triggerClassName="flex-1" />
          </div>
        </div>

        <Separator />
        <CalorieEntriesTable calorieEntries={calorieEntries} />
      </div>
    </div>
  );
};

export default Dashboard;
