"use client";

import { useState, FormEvent } from "react";
import { login } from "@/actions/auth";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const message = await login(formData); // Call server action
      setStatus(message); // Display success message
      setFormData({ email: "", password: "" }); // Reset form
    } catch (error: any) {
      setStatus(error.message || "An error occurred during login.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
