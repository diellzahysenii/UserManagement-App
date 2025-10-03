// UserTable.tsx
import { Link } from "react-router-dom";
import type { User } from "../types";

export default function UserTable({
  users, onSort, sortKey, sortDir
}: {
  users: User[];
  onSort: (k: "name" | "email" | "company") => void;
  sortKey: "name" | "email" | "company";
  sortDir: "asc" | "desc";
}) {
  const header = (label: string, k: "name"|"email"|"company") => (
    <th onClick={() => onSort(k)}>
      {label} {sortKey === k ? (sortDir === "asc" ? "▲" : "▼") : ""}
    </th>
  );
  return (
    <table className="table">
      <thead>
        <tr>
          {header("Name", "name")}
          {header("Email", "email")}
          {header("Company", "company")}
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>
              <Link className="link" to={`/users/${u.id}`}>{u.name}</Link>
              {u.isLocal && <span className="badge">local</span>}
            </td>
            <td>{u.email}</td>
            <td>{u.company?.name ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
