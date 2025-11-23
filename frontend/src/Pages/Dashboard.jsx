import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { clamp } from "../lib/utils";
import CalorieEntriesTable from "../components/CalorieEntriesTable";
import { Separator } from "@/components/ui/separator";
import { Edit, Plus } from "lucide-react";
import CalorieEntry from "../components/CalorieEntry";
import EditDailyCalories from "../components/EditDailyCalories";

const Dashboard = () => {
  const [caloriesConsumed, _setCaloriesConsumed] = useState(1000);
  const [goalCalories, setGoalCalories] = useState(2000);
  const caloriesLeft = goalCalories - caloriesConsumed;
  const caloriesConsumedPercentage = clamp(
    (caloriesConsumed / goalCalories) * 100,
    0,
    100
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-15">
        <div className="flex flex-col gap-4">
          <h1 className="text-8xl text-foreground text-center">
            {caloriesLeft}
            <span className="text-5xl text-muted-foreground"> left</span>
          </h1>
          <Progress
            value={caloriesConsumedPercentage}
            indicatorprops={
              caloriesConsumed > goalCalories ? "bg-red-500" : "bg-green-500"
            }
          />
          <div className="flex flex-row items-center justify-center gap-5">
            <EditDailyCalories
              goalCalories={goalCalories}
              setGoalCalories={setGoalCalories}
            />
            <CalorieEntry triggerClassName="flex-1" />
          </div>
        </div>

        <Separator />
        <CalorieEntriesTable />
      </div>
    </div>
  );
};

export default Dashboard;
