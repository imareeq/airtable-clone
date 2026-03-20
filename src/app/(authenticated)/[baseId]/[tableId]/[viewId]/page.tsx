"use client";

import { columns, type Payment } from "~/components/table/columns";
import { Spreadsheet } from "~/components/table/spreadsheet";

export default function Page() {
  const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ];

  return <Spreadsheet columns={columns} data={payments} />;
}
