import { useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import CalorieEntriesTable from "../components/CalorieEntriesTable";
import { Separator } from "@/components/ui/separator";
import CalorieEntry from "../components/CalorieEntry";
import EditDailyCalories from "../components/EditDailyCalories";
import api from "../lib/api.js";
import { auth } from "../lib/firebase.js";
import { toast } from "sonner";

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

    const updateCalorieEntries = async () => {
      const token = await auth.currentUser.getIdToken();
      const res = await api.get("http://localhost:3000/api/calorie-entries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setCalorieEntries(res.data.calorieEntries);
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
        />
      </div>
    </div>
  );
};

export default Dashboard;
