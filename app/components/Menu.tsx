import React from "react";
import Navbar from "./navbar";
import AccountsTable from "./accounts-table";
import TransactionsTable from "./transactions-table";

export default function Menu() {
  const drawerId = "sidebar-right";
  return (
    <>
    <Navbar drawerId={drawerId} />
      <div className="drawer">
      <p>Placeholder Statistic toggle</p>
      <AccountsTable />
        <input id={drawerId} type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content">
          {/* Page content here */}
          
          <TransactionsTable />
        </div>
        <div className="drawer-side">
          <label
            htmlFor={drawerId}
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
