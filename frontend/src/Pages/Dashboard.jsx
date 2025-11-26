import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import CalorieEntriesTable from "../components/CalorieEntriesTable";
import { Separator } from "@/components/ui/separator";
import CalorieEntry from "../components/CalorieEntry";
import EditDailyCalories from "../components/EditDailyCalories";
import api from "../lib/api.js";
import { toast } from "sonner";
import { clamp } from "../lib/utils.js";

const Dashboard = () => {
  const [dailyCalories, setDailyCalories] = useState(2000);
  const [calorieEntries, setCalorieEntries] = useState([]);
  const consumedCalories = useMemo(
    () =>
      calorieEntries.reduce(
        (total, calorieEntry) => (total += calorieEntry.calories),
        0
      ),
    [calorieEntries]
  );
  const consumedCaloriesPercentage = useMemo(
    () => clamp((consumedCalories / dailyCalories) * 100, 0, 100),
    [dailyCalories, consumedCalories]
  );

  useEffect(() => {
    const updateDailyCalories = async () => {
      const res = await api.get("/daily-calories");
      setDailyCalories(res.data);
    };

    const updateCalorieEntries = async () => {
      const res = await api.get("/calorie-entries");

      if (res.status === 200) {
        const newCalorieEntries = res.data.calorieEntries;

        // Filter the data to only include the entries today locally
        const filteredCalorieEntries = newCalorieEntries.filter((entry) => {
          const date = new Date(entry.createdAt);
          const today = new Date();
          return date.toLocaleDateString() === today.toLocaleDateString();
        });

        setCalorieEntries(filteredCalorieEntries);
      } else {
        toast.error("Error while fetching entries.");
      }
    };

    updateDailyCalories();
    updateCalorieEntries();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-15">
        <div className="flex flex-col gap-4">
          <h1 className="text-8xl text-foreground text-center">
            {Math.abs(dailyCalories - consumedCalories)}
            <span className="text-5xl text-muted-foreground">
              {" "}
              {consumedCalories <= dailyCalories ? "left" : "over"}
            </span>
          </h1>
          <Progress
            value={consumedCaloriesPercentage}
            indicatorprops={
              consumedCalories > dailyCalories ? "bg-red-500" : "bg-green-500"
            }
          />
          <div className="flex flex-row items-center justify-center gap-5">
            <EditDailyCalories
              dailyCalories={dailyCalories}
              setDailyCalories={setDailyCalories}
            />
            <CalorieEntry
              triggerClassName="flex-1"
              setCalorieEntries={setCalorieEntries}
            />
          </div>
        </div>

        <Separator />
        <CalorieEntriesTable
          calorieEntries={calorieEntries}
          consumedCalories={consumedCalories}
          setCalorieEntries={setCalorieEntries}
        />
      </div>
    </div>
  );
};

export default Dashboard;
