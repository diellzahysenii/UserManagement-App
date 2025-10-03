// src/features/users/components/AddUserForm.tsx
import { type FormEvent, useState } from "react";
import { useUsers } from "../UserContext";

export default function AddUserForm() {
  const { addLocalUser } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{name?: string; email?: string}>({});

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    addLocalUser({ name: name.trim(), email: email.trim() });
    setName(""); setEmail("");
  }

  return (
    
  <form onSubmit={onSubmit} style={{display:"grid", gap:"10px", maxWidth:520}}>
    <label>
      Name
      <input className="input" value={name} onChange={e=>setName(e.target.value)} />
      {errors.name && <div className="help" style={{color:"tomato"}}>{errors.name}</div>}
    </label>
    <label>
      Email
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
      {errors.email && <div className="help" style={{color:"tomato"}}>{errors.email}</div>}
    </label>
    <button className="btn" type="submit">Add</button>
  </form>
    
  );
}
