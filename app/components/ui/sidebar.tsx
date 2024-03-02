import Link from "next/link";
import {
  FaMinus,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
  FaPencil,
  FaBars,
} from "react-icons/fa6";
import { CiVault, CiBank, CiLogout, CiLogin } from "react-icons/ci";
import AddTransaction from "./transaction-modal-add";
import { signOut } from "@/auth";
import { getAccessTokenFromSession, getAccounts } from "@/app/lib/data";
import { Account } from "@/app/lib/definitions";

export default async function Sidebar() {
  const accounts = await getAccounts();
  return (
    <>
      {/* Navigation Toggle */}
      <button
        type="button"
        className="text-gray-600 hover:text-gray-600 rounded-lg bg-slate-300 p-2"
        data-hs-overlay="#docs-sidebar"
        aria-controls="docs-sidebar"
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Toggle Navigation</span>
        <FaBars className="flex-shrink-0 size-10" />
      </button>
      {/* End Navigation Toggle */}

      <div
        id="docs-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="px-6">
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            href="/"
          >
            Accountant
          </Link>
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <AddTransaction />
            </li>

            <AccountsList accounts={accounts} />

            <li className="hs-accordion" id="account-accordion">
              <button
                type="button"
                className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <CiVault className="size-4" />
                Vaults
                <FaChevronUp className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" />
                <FaChevronDown className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" />
              </button>

              <div
                id="account-accordion"
                className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden bg-slate-700 rounded py-1 px-2"
              >
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Planned for future release
                </p>
              </div>
            </li>
          </ul>
        </nav>
        {!(await getAccessTokenFromSession()) ? (
          <div className="p-6 w-full flex flex-col flex-wrap justify-end">
            <Link
              href="/login"
              className="w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <CiLogin className="size-4" />
              Login
            </Link>
          </div>
        ) : (
          <div className="p-6 w-full flex flex-col flex-wrap justify-end">
            <SignOutButton color="w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" />
          </div>
        )}
      </div>
    </>
  );
}

function SignOutButton({ color }: { color?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button className={color}>
        <CiLogout className="size-4" />
        <div>Logout</div>
      </button>
    </form>
  );
}

async function AccountsList({ accounts }: { accounts: Account[] | null }) {
  return (
    <li className="hs-accordion" id="accounts-accordion">
      <button
        type="button"
        className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      >
        <CiBank className="size-4" />
        Accounts
        <FaChevronUp className="hs-accordion-active:block ms-auto hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" />
        <FaChevronDown className="hs-accordion-active:hidden ms-auto block size-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" />
      </button>
      <div
        id="accounts-accordion"
        className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
      >
        <ul
          className="hs-accordion-group ps-3 pt-2"
          data-hs-accordion-always-open
        >
          {!accounts ? (
            <li>
              <div className="w-full bg-slate-700 rounded py-1 px-2">
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Data not available...
                </p>
              </div>
            </li>
          ) : (
            accounts?.map((account) => (
              <li
                key={account.id}
                className="hs-accordion"
                id="accounts-accordion-sub-1"
              >
                <button
                  type="button"
                  className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  {account.name}
                  <FaChevronUp className="hs-accordion-active:block ms-auto hidden size-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" />
                  <FaChevronDown className="hs-accordion-active:hidden ms-auto block size-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" />
                </button>
                <div
                  id="accounts-accordion-sub-1"
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                >
                  <label
                    htmlFor="hs-leading-multiple-add-on"
                    className="sr-only"
                  >
                    Account Functions
                  </label>
                  <div className="flex rounded-lg shadow-sm">
                    <button
                      type="button"
                      className="py-1 px-2 inline-flex justify-center items-center gap-x-2 text-xs rounded-s-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <FaPlus />
                      Transaction
                    </button>
                    <button
                      type="button"
                      className="py-1 px-2 inline-flex justify-center items-center gap-x-2 text-xs rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <FaPencil />
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </li>
  );
}
