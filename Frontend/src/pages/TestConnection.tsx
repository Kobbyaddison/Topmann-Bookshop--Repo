import { useState } from "react";
import * as api from "../utils/api";

export default function TestConnection() {
  const [message, setMessage] = useState("");

  const handleCheck = async () => {
    try {
      const res = await api.getProducts();
      setMessage(`✅ Connected! Got ${res.data.length} products`);
    } catch (err: any) {
      setMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={handleCheck}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Check Backend Connection
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
}
