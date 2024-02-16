export type User = {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
};

export type Account = {
  id: number;
  name: string;
  description: string;
  currency: string;
  owners: string[];
};

export type Transaction = {
  id: number;
  name: string;
  description: string;
  amount: number;
  //receipt: string;
  //guarantee: null;
  //beneficiary: string;
  //benefactor: string;
  //account: Account;
  //tag: <Tag>[];
  created_by: string;
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