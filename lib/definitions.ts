export type User = {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
};

export type AccountsTableType = {
    id: number;
    name: string;
    description: string;
    currency: string;
    owners: string[];
};
  
  export type FormattedAccountsTable = {
    id: number;
    name: string;
    description: string;
    currency: string;
    owners: string[];
};

export type TransactionsTableType = {
  id: number;
  name: string;
  description: string;
  currency: string;
  owners: string[];
};

export type FormattedTransactionsTable = {
  id: number;
  name: string;
  description: string;
  currency: string;
  owners: string[];
};