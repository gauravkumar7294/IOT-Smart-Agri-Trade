import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
 import apiClient from '../api/apiClient'; 
const SignUpPage = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Farmer" // Default role
    });
    const [error, setError] = useState(null);
    const { setAuthUser } = useAuthContext();
// 1. Import the client

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (inputs.password !== inputs.confirmPassword) {
        return setError("Passwords do not match");
    }
    try {
        // 2. Replace the fetch call with the apiClient
        const data = await apiClient('/api/auth/signup', {
            body: inputs
        });
        
        setAuthUser(data); // Update context and local storage
    } catch (err) {
        setError(err.message);
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input type="text" value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">I am a:</label>
                        <select value={inputs.role} onChange={(e) => setInputs({ ...inputs, role: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                            <option value="Farmer">Farmer</option>
                            <option value="Trader">Trader</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Sign Up</button>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </form>
                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" className="text-green-500">Login</Link>
                </p>
            </div>
        </div>
    );
};
export default SignUpPage;