import { Account, Transaction } from "./definitions";

export async function getTransactions(): Promise<Transaction[]> {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    //noStore();
    try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)
  
      // console.log('Fetching revenue data...');
      // await new Promise((resolve) => setTimeout(resolve, 3000));
  
      const data = await fetch("http://127.0.0.1:8000/api/transactions/");
  
      // console.log('Data fetch completed after 3 seconds.');
  
      return data.json() as Promise<Transaction[]>;
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw new Error('Failed to fetch Transactions');
    }
  }