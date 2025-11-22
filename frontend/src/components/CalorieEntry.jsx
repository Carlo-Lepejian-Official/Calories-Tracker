import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const CalorieEntry = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="w-full">
          <Plus></Plus>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <Input type="number" min={1} className="text-center"></Input>
          <Button>Submit</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CalorieEntry;
