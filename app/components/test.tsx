export default function AccountTest() {
    async function accountsList() {
        'use server'
        const res = await fetch("http://127.0.0.1:8000/api/accounts/");
        const accounts = await res.json();
        return { accounts: accounts };
    }
}