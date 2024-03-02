import { Account, Transaction } from "./definitions";
import { auth } from "@/auth";

export async function getAccessTokenFromSession(): Promise<string | null> {
  // get jwt from session >> should be removed from session in future auth.js release
  const session: any = await auth();
  //console.log("JWT from Session:", session?.token.access_token);

  try {
    if (!session.token.access_token) {
      return null;
    }
    return session.token.access_token;
  } catch (error) {
    return null;
  }
}

export async function getAccounts(): Promise<Account[] | null> {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    let jwt = await getAccessTokenFromSession();
    if (!jwt) {
      return null;
    }
    const data = await fetch(process.env.BACKEND_URL + "/api/accounts/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
    });

    //console.log("DATA response:", data.ok);
    if (!data.ok) {
      return null;
    }

    return data.json() as Promise<Account[]>;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw new Error("Failed to fetch Accounts");
  }
}

export async function getTransactions(): Promise<Transaction[] | null> {
  try {
    let jwt = await getAccessTokenFromSession();
    if (!jwt) {
      return null;
    }
    const data = await fetch(process.env.BACKEND_URL + "/api/transactions/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
    });

    if (!data.ok) {
      return null;
    }

    return data.json() as Promise<Transaction[]>;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw new Error("Failed to fetch Transactions");
  }
}
