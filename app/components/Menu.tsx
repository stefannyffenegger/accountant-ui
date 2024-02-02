import React from "react";
import Navbar from "./navbar";
import AccountsTable from "./accounts-table";

const Menu = () => {
  const drawerId = "sidebar-right";
  return (
    <>
      <div className="drawer">
        <input id={drawerId} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Navbar drawerId={drawerId} />
          <AccountsTable accounts={} />
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
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
