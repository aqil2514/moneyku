import Typography from "components/General/Typography";

export default function TransactionSkeleton() {
  return (
    <div id="transaction" className="main-page">
      <div className="flex justify-center border-double">
        <Typography family="playfair-bold" variant="h1">
          {/* {res.filterData ? `${res.filterData}` : "Transaksi"} */}
          Transaksi
        </Typography>
      </div>

      <TransactionNavbarSkeleton />

      <header className=" container-filter flex gap-1 items-center">
        <div className="skeleton skeleton-general"></div>
      </header>

      <main id="transaction-data" className="mt-4">
        <div className="skeleton skeleton-general"></div>
        <div className="skeleton skeleton-general"></div>
        <div className="skeleton skeleton-general"></div>
        <div className="skeleton skeleton-general"></div>
      </main>
    </div>
  );
}

function TransactionNavbarSkeleton() {
  return (
    <header id="transaction-navbar">
      <section className="income-section">
        <Typography variant="p" family="ubuntu-medium">
          Pemasukan
        </Typography>
        <div className="skeleton skeleton-text"></div>
      </section>
      <section className="outcome-section">
        <Typography variant="p" family="ubuntu-medium">
          Pengeluaran
        </Typography>
        <div className="skeleton skeleton-text"></div>
      </section>
      <section className="total-section">
        <Typography variant="p" family="ubuntu-medium">
          Total
        </Typography>
        <div className="skeleton skeleton-text"></div>
      </section>
    </header>
  );
}
