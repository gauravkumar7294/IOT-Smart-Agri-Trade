import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import apiClient from '../api/apiClient'; // 1. Import the client
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setAuthUser } = useAuthContext();


const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        // 2. Replace the fetch call with the apiClient
        const data = await apiClient('/api/auth/login', {
            body: { email, password } 
        });
        
        setAuthUser(data); // Update context and local storage
    } catch (err) {
        setError(err.message);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Login</button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-green-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;