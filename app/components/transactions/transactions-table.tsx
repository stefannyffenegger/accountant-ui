import { columns } from "./transactions-column";
import { DataTable } from "../ui/data-table";
import { Transaction } from "@/app/lib/definitions";
import { getTransactions } from "@/app/lib/data";

async function getTestData(): Promise<Transaction[]> {
  // Fetch data from your API here.
  return [
    {
      id: 232,
      name: "Bonus",
      amount: 3000.5,
      description: "2023",
      created_by: "mike@example.com",
    },
    {
      id: 331,
      name: "Salary Jan",
      amount: 5777.55,
      description: "Monthly Salary",
      created_by: "alice@example.com",
    },
    {
      id: 332,
      name: "Salary Feb",
      amount: 5730.25,
      description: "Monthly Salary",
      created_by: "bob@example.com",
    },
    {
      id: 223,
      name: "Groceries Feb",
      amount: 244.65,
      description: "",
      created_by: "mike@example.com",
    },
    // ...
  ];
}

export default async function TransactionsTable() {
  const data = await getTransactions(); //getTestData();

  return <DataTable columns={columns} data={data} />;
}
