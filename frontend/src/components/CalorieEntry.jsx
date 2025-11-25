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
import { useAuth } from "@clerk/clerk-react";
import api from "../lib/api";
import { toast } from "sonner";

const CalorieEntry = ({ triggerClassName }) => {
  const { getToken } = useAuth();
  const [entryValue, setEntryValue] = useState(1);

  const handleAddEntry = async () => {
    const token = await getToken();
    api
      .post(
        "/calorie-entries",
        {
          calories: entryValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Added entry!");
        } else {
          toast.error("Failed to add entry.");
        }
      });
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
