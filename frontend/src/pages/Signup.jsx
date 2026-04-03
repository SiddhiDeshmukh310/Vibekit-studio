import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      alert("Signup successful");
    } catch (err) {
  console.error("FULL ERROR:", err);
  alert(err.response?.data?.error || "Error signing up");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 border rounded-xl w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white py-2 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}