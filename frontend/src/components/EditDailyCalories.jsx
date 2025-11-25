import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/Button";
import { Edit, Minus, Plus } from "lucide-react";
import { clamp } from "../lib/utils";
import { useAuth } from "@clerk/clerk-react";
import api from "../lib/api";

const EditDailyCalories = ({ dailyCalories, setDailyCalories }) => {
  const { getToken } = useAuth();
  const [calories, setCalories] = useState(dailyCalories);

  const changeCalories = (changeBy) => {
    setCalories(clamp(calories + changeBy, 100, 10000));
  };

  const trySetDailyCalories = async () => {
    try {
      const token = await getToken();
      const res = await api.post(
        "/daily-calories",
        {
          dailyCalories: calories,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data) {
        setDailyCalories(res.data);
      }
    } catch (error) {
      console.error("Couldn't update daily calories. ", error);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          onClick={() => {
            setCalories(dailyCalories);
          }}
        >
          <Edit />
          Edit Daily Calories
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="w-full mx-auto max-w-sm">
            <DrawerTitle>Daily Calories</DrawerTitle>
            <DrawerDescription>Set your daily calories goal!</DrawerDescription>
          </div>
        </DrawerHeader>

        <div className="flex flex-col">
          <div className="flex flex-row gap-10 items-center justify-center">
            <Button
              className="rounded-full size-10"
              onClick={() => changeCalories(-100)}
            >
              <Minus className="text-primary-foreground" />
            </Button>
            <div className="flex flex-col gap-0 w-sm">
              <p className="text-primary text-center text-8xl">{calories}</p>
              <p className="text-muted-foreground text-center">CALORIES/DAY</p>
            </div>
            <Button
              className="rounded-full size-10"
              onClick={() => changeCalories(100)}
            >
              <Plus className="text-primary-foreground" />
            </Button>
          </div>
        </div>

        <DrawerFooter>
          <div className="flex flex-col items-center justify-center gap-2">
            <Button className="w-xl" onClick={trySetDailyCalories}>
              Submit
            </Button>
            <DrawerClose asChild>
              <Button className="w-xl" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditDailyCalories;
