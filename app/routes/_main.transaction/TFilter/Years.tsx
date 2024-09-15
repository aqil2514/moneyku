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
import { useTransactionData } from "../Provider";

const startYear = 2001;
const endYear = 2040;

export default function YearDropDown() {
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  const { year, setYear } = useTransactionData();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button color="primary">{year} </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-56">
        <DropdownMenuLabel>Pilih Tahun</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={year} onValueChange={setYear}>
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
