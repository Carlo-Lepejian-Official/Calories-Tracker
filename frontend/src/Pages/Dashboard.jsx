import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/Button";
import { clamp } from "../lib/utils";
import CalorieEntriesTable from "../components/CalorieEntriesTable";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const [caloriesConsumed, setCaloriesConsumed] = useState(1000);
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
          <Button className="w-full">
            <Plus />
          </Button>
        </div>

        <Separator />
        <CalorieEntriesTable />
      </div>
    </div>
  );
};

export default Dashboard;
