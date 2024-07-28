import dayjs from "dayjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import Button from "components/Inputs/Button";
import { useState } from "react";

const startYear = 2001;
const endYear = 2040;

export default function YearDropDown() {
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  const currentYear = String(dayjs().year());

  const [position, setPosition] = useState<string>(currentYear);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button color="primary">{position} </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-56 overflow-y-scroll">
        <DropdownMenuLabel>Pilih Tahun</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {years.map((year, index) => (
            <DropdownMenuRadioItem
              key={`year-${index + 1}`}
              value={String(year)}
            >
              {year}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
