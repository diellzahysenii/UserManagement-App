import { type FormEvent, useState } from "react";

export default function AddUserForm({addLocalUser}: {
  addLocalUser: (u:{name:string; email:string; companyName?:string}) => void
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<{name?:string; email?:string}>({});

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
    addLocalUser({ name: name.trim(), email: email.trim(), companyName: company.trim() || undefined });
    setName(""); setEmail(""); setCompany("");
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
      <label>
        Company <span className="help"></span>
        <input className="input" value={company} onChange={e=>setCompany(e.target.value)} placeholder="(optional)" />
      </label>
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
