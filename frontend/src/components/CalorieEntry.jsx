import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { auth } from "../lib/firebase";
import api from "../lib/api";

const CalorieEntry = ({ triggerClassName, setCalorieEntries }) => {
  const [entryValue, setEntryValue] = useState(1);

  const handleAddEntry = async () => {
    const token = await auth.currentUser.getIdToken();
    const res = await api.post(
      "http://localhost:3000/api/calorie-entries",
      {
        calories: entryValue,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      toast.success("Added entry!");
      setCalorieEntries((old) => old.concat(res.data.calorieEntry));
    } else {
      toast.error("Couldn't add entry. Please try again later.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={triggerClassName} asChild>
        <Button className="w-full">
          <Plus />
          Add Entry
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Entry</DialogTitle>
        </DialogHeader>

        <Input
          type="number"
          min={1}
          max={10000}
          className="text-center"
          onChange={(e) => setEntryValue(e.target.value)}
        ></Input>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleAddEntry}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalorieEntry;
