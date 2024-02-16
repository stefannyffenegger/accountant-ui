"use client";

import { useState } from "react";
import Link from "next/link";
import { MdInput, MdOutput } from "react-icons/md";

import { CalendarDateRangePicker } from "./date-range-picker";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { StatisticsBarChart } from "./statistics";
import TransactionsTable from "../transactions/transactions-table";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-40" : "w-60 "
        } flex flex-col h-screen p-3 bg-black shadow duration-300`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Accountant</h2>
            <button onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text font-bold">Add Transaction</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vaults</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text font-bold">Add/Edit Vault</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text font-bold">Add/Edit Account</div>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>

          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link
                  href="/settings"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-100">Settings</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/logout"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-gray-100">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12">
        <div className="gap-4">
          <CalendarDateRangePicker />
        </div>

        <Accordion
          type="single"
          defaultValue="item-1"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Transactions</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent>
                  <TransactionsTable />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion
          type="single"
          defaultValue="item-2"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-2">
            <AccordionTrigger>Statistics</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Income
                    </CardTitle>
                    <MdInput />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32'565.34 CHF</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Expenses
                    </CardTitle>
                    <MdOutput />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2'333.00 CHF</div>
                    <p className="text-xs text-muted-foreground">
                      -27.6% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Savings
                    </CardTitle>
                    <MdOutput />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3'051.00 CHF</div>
                    <p className="text-xs text-muted-foreground">
                      +2.4% from average
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +1.45% from median
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Median Monthly Savings
                    </CardTitle>
                    <MdOutput />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2'341.87 CHF</div>
                    <p className="text-xs text-muted-foreground">
                      +1.1% from Median
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    Transaction Chart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StatisticsBarChart />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
