import { Link, useLoaderData, useLocation } from "react-router-dom";
import type { User } from "../types";
import { useMemo } from "react";

type LocationState = { user?: User };

export default function UserDetailsPage() {
  const routeUser = useLoaderData() as User | null; 
  const location = useLocation();
  const stateUser = (location.state as LocationState | null)?.user;
  const user = stateUser ?? routeUser;

  const initials = useMemo(() => {
    const n = user?.name ?? "";
    return n.split(" ").map(s => s[0]).filter(Boolean).slice(0,2).join("").toUpperCase() || "U";
  }, [user]);

  if (!user) {
    return (
      <div className="container">
        <div style={{ marginBottom: 12 }}>
          <Link className="link" to=" / ">← Back to users</Link>
        </div>
        <div className="panel card details-card">
          <h1 className="h1" style={{ textAlign: "center", margin: 0 }}>User not found</h1>
          <p className="help" style={{ textAlign: "center" }}>
            Try to navige from the list again.
          </p>
        </div>
      </div>
    );
  }

  const addr = user.address
    ? `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`
    : "—";

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <Link className="link" to="/">← Back to users</Link>
      </div>

      <div className="panel card details-card">
        <div className="details-header">
          <div className="avatar">{initials}</div>
          <h1 className="h1" style={{ margin: "8px 0 0", textAlign: "center" }}>{user.name}</h1>
          {user.company?.name && (
            <div className="help" style={{ marginTop: 6, textAlign: "center" }}>{user.company.name}</div>
          )}
        </div>

        <dl className="kv">
          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{user.phone ?? "—"}</dd>
          </div>
          <div>
            <dt>Website</dt>
            <dd>
              {user.website
                ? <a className="link" href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
                : "—"}
            </dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{addr}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
