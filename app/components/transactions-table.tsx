import {
  AccountsTableType,
  FormattedAccountsTable
} from '@/app/lib/definitions';

export default async function TransactionsTable() {
  const res = await fetch("http://127.0.0.1:8000/api/transactions");
  const accounts: FormattedAccountsTable[] = await res.json();
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Account</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <th><div className="tooltip tooltip-bottom" data-tip={account.description}>
                  {account.name}
                  </div>
                </th>
                <th>{account.currency}</th>
                <th><div className="join join-vertical lg:join-horizontal">
                    <button className="btn join-item">E</button>
                    <button className="btn join-item">D</button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
