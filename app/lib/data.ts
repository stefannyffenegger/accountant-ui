import { Account, Transaction } from "./definitions";
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";

export async function getAccounts(): Promise<Account[] | null> {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // get jwt from session >> should be removed from session in future auth.js release
    const session: any = await auth();
    //console.log("DATA SESSION JWT:", session?.token);
    const data = await fetch(process.env.BACKEND_URL + "/api/accounts/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session?.token.access_token,
        "Content-Type": "application/json",
      },
    });

    console.log("DATA response:", data.ok);
    if (!data.ok) {
      return null;
    }

    return data.json() as Promise<Account[]>;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw new Error("Failed to fetch Accounts");
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const data = await fetch(process.env.BACKEND_URL + "/api/transactions/");

    // console.log('Data fetch completed after 3 seconds.');

    return data.json() as Promise<Transaction[]>;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw new Error("Failed to fetch Transactions");
  }
}
