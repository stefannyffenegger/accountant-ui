import React from "react";

interface User {
  id: number;
  first_name: string;
  username: string;
  email: string;
}

const Users = async () => {
  //const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const res = await fetch("http://127.0.0.1:8000/api/v1/users/");
  const users: User[] = await res.json();
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>UID</th>
              <th>First Name</th>
              <th>Username</th>
              <th>Mail</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <th>{user.first_name}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
