import {
  AccountsTableType,
  FormattedAccountsTable
} from '@/app/lib/definitions';

export default async function AccountsTable() {
  //const res = await fetch("https://jsonplaceholder.typicode.com/users");
  //const res = await fetch("http://127.0.0.1:8000/api/users/");
  const res = await fetch("http://127.0.0.1:8000/api/accounts");
  const accounts: FormattedAccountsTable[] = await res.json();
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>UID</th>
              <th>Account</th>
              <th>Description</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <th>{account.id}</th>
                <th><div className="tooltip tooltip-bottom" data-tip={account.description}>
                  {account.name}
                  </div>
                </th>
                <th>{account.description}</th>
                <th>{account.currency}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
