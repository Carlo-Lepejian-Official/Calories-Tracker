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

const CalorieEntriesTable = ({ calorieEntries }) => {
  const _handleEdit = () => {};

  const editButton = () => {
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

          <Input type="number" min={1}></Input>

          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const deleteButton = () => {
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
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" type="submit">
              Yes, delete.
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const calorieEntryRow = (calorieEntry) => {
    return (
      <TableRow className="group" key={calorieEntry.Id}>
        <TableCell className="text-center">{calorieEntry.Date}</TableCell>
        <TableCell className="text-center">{calorieEntry.Calories}</TableCell>
        <TableCell
          align="right"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {editButton()}
          {deleteButton()}
        </TableCell>
      </TableRow>
    );
  };

  return (
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
          <TableCell className="text-center">200</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CalorieEntriesTable;
