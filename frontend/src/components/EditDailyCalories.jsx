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

const EditDailyCalories = ({ goalCalories }) => {
  const [calories, setCalories] = useState(goalCalories);

  const changeCalories = (changeBy) => {
    setCalories(clamp(calories + changeBy, 100, 10000));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          onClick={() => {
            setCalories(goalCalories);
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
            <Button className="w-xl">Submit</Button>
            <DrawerClose>
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
