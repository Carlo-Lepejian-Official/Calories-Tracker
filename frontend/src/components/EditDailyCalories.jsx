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
import { Button } from "@/components/ui/button";
import { Edit, Minus, Plus } from "lucide-react";
import { clamp } from "../lib/utils";
import { toast } from "sonner";
import api from "../lib/api";

const EditDailyCalories = ({ dailyCalories, setDailyCalories }) => {
  const [calories, setCalories] = useState(dailyCalories);

  const changeCalories = (changeBy) => {
    setCalories(clamp(calories + changeBy, 100, 10000));
  };

  const trySetDailyCalories = async () => {
    const res = await api.post("http://localhost:3000/api/daily-calories", {
      dailyCalories: calories,
    });

    if (res.status === 200) {
      setDailyCalories(res.data);
      toast.success("Changed daily calories!");
    } else {
      toast.error("Couldn't change daily calories. Please try again later.");
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
            <DrawerClose asChild>
              <Button className="w-xl" onClick={trySetDailyCalories}>
                Submit
              </Button>
            </DrawerClose>
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
