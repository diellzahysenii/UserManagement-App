import type { LoaderFunctionArgs } from "react-router-dom";
import { fetchUserById, fetchUsers } from "./api";
import type { User } from "./types";

export async function usersListLoader(): Promise<User[]> {
    return fetchUsers(); // fetch para render
  }

export async function userLoader({ params }: LoaderFunctionArgs): Promise<User | null> {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id < 0) return null; 
  try { return await fetchUserById(id); } catch { return null; }
}
