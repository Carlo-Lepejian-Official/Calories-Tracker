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

const CalorieEntriesTable = () => {
  return (
    <Table className="text-primary">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold">Time</TableHead>
          <TableHead className="text-center font-bold">Calories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-center">9:00 AM</TableCell>
          <TableCell className="text-center">200</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center font-bold">Total</TableCell>
          <TableCell className="text-center">200</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CalorieEntriesTable;
