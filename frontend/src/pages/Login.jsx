import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    window.location.href = "/app";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-2xl w-80 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>

        <input
          placeholder="Email"
          className="w-full p-2 mb-3 bg-slate-700 rounded"
          onChange={(e) =>
            setEmail(e.target.value.trim().toLowerCase())
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-slate-700 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}