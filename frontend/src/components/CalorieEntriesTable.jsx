import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import api from "../lib/api.js";

const CalorieEntriesTable = ({
  calorieEntries,
  consumedCalories,
  setCalorieEntries,
}) => {
  const [editEntryValue, setEditEntryValue] = useState(0);

  const handleEdit = async (entryId, changeTo) => {
    const res = await api.post("http://localhost:3000/api/edit-calorie-entry", {
      entryId,
      changeTo,
    });

    if (res.status === 200) {
      setCalorieEntries((prev) =>
        prev.map((entry) => {
          if (entry._id == entryId) {
            return {
              ...entry,
              calories: Number(changeTo),
            };
          } else {
            return entry;
          }
        })
      );
    }
  };

  const handleDelete = async (entryId) => {
    const res = await api.delete(
      `http://localhost:3000/api/edit-calorie-entry/${entryId}`
    );

    if (res.status === 200) {
      setCalorieEntries((prev) => prev.filter((entry) => entry._id != entryId));
    }
  };

  const editButton = (calorieEntry) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost">
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
          </DialogHeader>

          <Input
            type="number"
            min={1}
            onChange={(e) => setEditEntryValue(e.target.value)}
          ></Input>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={() => handleEdit(calorieEntry._id, editEntryValue)}
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const deleteButton = (calorieEntry) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost">
            <Trash className="text-red-800" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                type="submit"
                onClick={() => handleDelete(calorieEntry._id)}
              >
                Yes, delete.
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const calorieEntryRow = (calorieEntry) => {
    return (
      <TableRow className="group" key={calorieEntry._id}>
        <TableCell className="text-center">
          {new Date(calorieEntry.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TableCell>
        <TableCell className="text-center">{calorieEntry.calories}</TableCell>
        <TableCell
          align="right"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {editButton(calorieEntry)}
          {deleteButton(calorieEntry)}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="max-h-80 min-h-80 overflow-y-scroll">
      <Table className="text-primary">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold">Time</TableHead>
            <TableHead className="text-center font-bold">Calories</TableHead>
            <TableHead className="w-1"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calorieEntries.map((calorieEntry) => calorieEntryRow(calorieEntry))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-center font-bold">Total</TableCell>
            <TableCell className="text-center">{consumedCalories}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CalorieEntriesTable;
