import { useMemo } from "react";
import { useUsers } from "../UserContext";
import UserTable from "../components/UserTable";
import AddUserForm from "../components/AddUserForm";

export default function UsersPage() {
  const { users, loading, error, search, setSearch, sortKey, sortDir, setSort } = useUsers();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q
      ? users.filter(u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
        )
      : users;
    const sorted = [...list].sort((a, b) => {
      const getVal = (k: "name"|"email"|"company", x: any) =>
        k === "company" ? (x.company?.name ?? "") : (x[k] ?? "");
      const av = getVal(sortKey, a) as string;
      const bv = getVal(sortKey, b) as string;
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return sorted;
  }, [users, search, sortKey, sortDir]);

  if (loading) return <div className="container"><p>Loading…</p></div>;
  if (error) return <div className="container"><div className="alert">Error: {error}</div></div>;

  return (
    <div className="container">
      <div className="header">
        <h1 className="h1">User Management</h1>
        <a className="btn secondary" href="https://jsonplaceholder.typicode.com/users" target="_blank">API</a>
      </div>

      <div className="toolbar">
        <input
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
        />
      </div>

      <div className="panel">
        <div className="table-wrap">
          <UserTable users={filtered} onSort={setSort} sortKey={sortKey} sortDir={sortDir} />
        </div>
      </div>

      <div className="panel card" style={{ marginTop: 16 }}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>Add New User <span className="help">(local only)</span></h2>
        <AddUserForm />
      </div>
    </div>
  );
}
