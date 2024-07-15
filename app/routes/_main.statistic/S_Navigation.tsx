import Typography from "components/General/Typography";
import Button from "components/Inputs/Button";
import { useStatisticData } from "./Providers/StatisticProvider";
import { TransactionCategory } from "./@types";

const buttonElements: TransactionCategory[] = [
  "Pemasukan",
  "Pengeluaran",
  "Transfer",
];

export default function StatisticNavigation() {
  const { category, setCategory } = useStatisticData();
  return (
    <div>
      <div className="flex gap-2">
        {buttonElements.map((button, index) => (
          <Button
            color="primary"
            onClick={() => setCategory(button)}
            disabled={category === button}
            key={index + 1}
          >
            {button}
          </Button>
        ))}
      </div>
      <Typography family="playfair-bold" variant="h2">
        Kategori Transaksi : {category}{" "}
      </Typography>
    </div>
  );
}
