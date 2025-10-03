// src/features/users/UsersContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchUsers } from "./api";
import type { User } from "./types";

type SortKey = "name" | "email" | "company";
type SortDir = "asc" | "desc";

type UsersCtx = {
  users: User[];
  loading: boolean;
  error: string | null;
  addLocalUser: (u: Pick<User, "name" | "email">) => void;
  updateUser: (u: User) => void;
  deleteUser: (id: number) => void;
  search: string; setSearch: (s: string) => void;
  sortKey: SortKey; sortDir: SortDir; setSort: (k: SortKey) => void;
};

const Ctx = createContext<UsersCtx | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  useEffect(() => {
    (async () => {
      try { setUsers(await fetchUsers()); }
      catch (e) { setError((e as Error).message); }
      finally { setLoading(false); }
    })();
  }, []);

  const setSort = (k: SortKey) => {
    setSortDir(prev => (k === sortKey ? (prev === "asc" ? "desc" : "asc") : "asc"));
    setSortKey(k);
  };

  const addLocalUser = (u: Pick<User, "name" | "email">) => {
    const id = -Date.now(); // negative id avoids collision with API ids
    setUsers(prev => [{ id, ...u, isLocal: true }, ...prev]);
  };
  const updateUser = (u: User) => setUsers(prev => prev.map(x => x.id === u.id ? u : x));
  const deleteUser = (id: number) => setUsers(prev => prev.filter(x => x.id !== id));

  const value: UsersCtx = useMemo(() => ({
    users, loading, error, addLocalUser, updateUser, deleteUser,
    search, setSearch, sortKey, sortDir, setSort
  }), [users, loading, error, search, sortKey, sortDir]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useUsers = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUsers must be used inside UsersProvider");
  return v;
};
