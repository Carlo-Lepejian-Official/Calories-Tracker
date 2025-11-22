import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CalorieEntriesTable = () => {
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
        <TableRow className="group">
          <TableCell className="text-center">9:00 AM</TableCell>
          <TableCell className="text-center">200</TableCell>
          <TableCell
            align="right"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button size="sm" variant="ghost">
              <Edit />
            </Button>
            <Button size="sm" variant="ghost">
              <Trash className="text-red-900" />
            </Button>
          </TableCell>
        </TableRow>
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
