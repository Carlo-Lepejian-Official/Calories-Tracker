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

const CalorieEntry = ({ triggerClassName }) => {
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
        ></Input>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button type="submit">Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalorieEntry;
