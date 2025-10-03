// src/features/users/pages/UserDetailsPage.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsers } from "../UserContext";
import { fetchUserById } from "../api";
import type { User } from "../types";

export default function UserDetailsPage() {
  const { id } = useParams();
  const numericId = Number(id);
  const { users } = useUsers();
  const fromStore = users.find((u: { id: number; }) => u.id === numericId);
  const [user, setUser] = useState<User | null>(fromStore ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user && numericId > 0) {
      fetchUserById(numericId).then(setUser).catch(e => setError((e as Error).message));
    }
  }, [user, numericId]);

  if (error) return <p role="alert">Error: {error}</p>;
  if (!user) return <p>Loading…</p>;

  const addr = user.address
    ? `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`
    : "—";

  return (
    <div style={{maxWidth:800, margin:"2rem auto", padding:"0 1rem"}}>
      <Link to="">{`←` } Back</Link>
      <h1 style={{marginTop:"1rem"}}>{user.name}</h1>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone ?? "—"}</p>
      <p><b>Website:</b> {user.website ? <a href={`https://${user.website}`} target="_blank">{user.website}</a> : "—"}</p>
      <p><b>Address:</b> {addr}</p>
    </div>
  );
}
