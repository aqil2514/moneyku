import { Accounts, Category } from "~/@types/Assets-Experimental";

export const defaultGroups: string[] = [
  "Tunai",
  "E-Wallet",
  "Investasi",
  "Utang",
  "Piutang",
  "Bisnis",
];

export const defaultCurrencies:string[] = [
  "IDR",
  "USD"
]

export const defaultAccounts: Accounts[] = [
  {
    account_id: "acc-001",
    name: "Uang Tunai",
    amount: 1500000,
    currency: "IDR",
    icon: "https://example.com/icons/cash.png",
    color: "#FF5733",
    description: "Uang tunai untuk kebutuhan sehari-hari",
    group: "Tunai",
    created_at: "2024-05-01T00:00:00Z",
  },
  {
    account_id: "acc-002",
    name: "Go-Pay",
    amount: 5000000,
    currency: "IDR",
    icon: "https://example.com/icons/ewallet.png",
    color: "#33FF57",
    description: "Saldo di E-Wallet untuk transaksi digital",
    group: "E-Wallet",
    created_at: "2024-09-15T00:00:00Z",
  },
  {
    account_id: "acc-003",
    name: "BRI",
    amount: 10000000,
    currency: "IDR",
    icon: "https://example.com/icons/bank.png",
    color: "#3357FF",
    description: "Akun bank untuk tabungan dan investasi",
    group: "Bank",
    created_at: "2023-12-05T00:00:00Z",
  },
  {
    account_id: "acc-004",
    name: "Paypal",
    amount: 2500000,
    currency: "USD",
    icon: "https://example.com/icons/international-bank.png",
    color: "#FFD700",
    description: "Akun bank internasional untuk transaksi luar negeri",
    group: "Bank",
    created_at: "2024-03-01T00:00:00Z",
  },
  {
    account_id: "acc-005",
    name: "SeaBank",
    amount: 750000,
    currency: "IDR",
    icon: "https://example.com/icons/cashless.png",
    color: "#FF33A8",
    description: "Saldo di kartu kredit virtual",
    group: "E-Wallet",
    created_at: "2021-02-15T00:00:00Z",
  },
];

export const defaultCategories: Category[] = [
  {
    category_id: "trc-001",
    name: "Makanan & Minuman",
    description: "Pengeluaran untuk makanan dan minuman sehari-hari",
    color: "#FF5733",
    icon: "https://example.com/icons/food.png",
    created_at: "2023-01-15T00:00:00Z",
  },
  {
    category_id: "trc-002",
    name: "Transportasi",
    description: "Biaya transportasi seperti bensin, tiket kereta, atau taksi",
    color: "#33FF57",
    icon: "https://example.com/icons/transport.png",
    created_at: "2023-02-10T00:00:00Z",
  },
  {
    category_id: "trc-003",
    name: "Hiburan",
    description:
      "Pengeluaran untuk hiburan seperti bioskop, konser, dan lainnya",
    color: "#5733FF",
    icon: "https://example.com/icons/entertainment.png",
    created_at: "2023-03-22T00:00:00Z",
  },
  {
    category_id: "trc-004",
    name: "Kesehatan",
    description:
      "Biaya pengeluaran untuk kesehatan seperti obat-obatan atau rumah sakit",
    color: "#33AFFF",
    icon: "https://example.com/icons/health.png",
    created_at: "2023-04-05T00:00:00Z",
  },
  {
    category_id: "trc-005",
    name: "Pendidikan",
    description:
      "Pengeluaran untuk kebutuhan pendidikan seperti buku atau kursus",
    color: "#FF33A1",
    icon: "https://example.com/icons/education.png",
    created_at: "2023-05-12T00:00:00Z",
  },
];
