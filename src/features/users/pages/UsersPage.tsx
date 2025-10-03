import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { User } from "../types";
import UserTable from "../components/UserTable";
import AddUserForm from "../components/AddUserForm";

export default function UsersPage() {
  const initial = useLoaderData() as User[];   
  const [users, setUsers] = useState<User[]>(initial);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"name"|"email"|"company">("name");
  const [sortDir, setSortDir] = useState<"asc"|"desc">("asc");

  const setSort = (k: "name"|"email"|"company") => {
    setSortDir(prev => (k === sortKey ? (prev === "asc" ? "desc" : "asc") : "asc"));
    setSortKey(k);
  };

  const addLocalUser = (u: { name: string; email: string; companyName?: string }) => {
    const id = -Date.now();
    setUsers(prev => [{
      id,
      name: u.name,
      email: u.email,
      isLocal: true,
      company: u.companyName ? { name: u.companyName, catchPhrase: "", bs: "" } : undefined
    }, ...prev]);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q
      ? users.filter(u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
        )
      : users;
    const getVal = (k: typeof sortKey, x: User) =>
      k === "company" ? (x.company?.name ?? "") : ((x as any)[k] ?? "");
    return [...list].sort((a,b) => {
      const av = getVal(sortKey, a), bv = getVal(sortKey, b);
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [users, search, sortKey, sortDir]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="h1">User Management</h1>
      </div>

      <div className="toolbar">
        <input
          className="input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email"
        />
      </div>

      <div className="panel"><div className="table-wrap">
        <UserTable users={filtered} onSort={setSort} sortKey={sortKey} sortDir={sortDir} />
      </div></div>

      <div className="panel card" style={{ marginTop: 16 }}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>Add New User <span className="help">(local only)</span></h2>
        <AddUserForm addLocalUser={addLocalUser} />
      </div>
    </div>
  );
}
