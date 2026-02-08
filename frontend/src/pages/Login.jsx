import React, { useState} from 'react'
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi'
import { useGlobalContext } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const { login }=useGlobalContext();
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        loginId: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const {loginId,password}=formData;
            await login({loginId,password});
            navigate("/Dashboard");
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error('Login error:', err);
        }
    }
    return (
        <div className=" min-h-screen bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className=" mt-10">
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                        <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
                    </div>
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login ID */}
                    <div>
                        <label htmlFor="loginId" className="block text-sm font-semibold text-white mb-2">
                            Login ID
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-5 text-slate-500 w-5 h-5" />
                            <input
                                type="text"
                                id="loginId"
                                name="loginId"
                                value={formData.loginId}
                                onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                                placeholder="Enter your Login ID"
                                className={`w-full pl-12 pr-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition `}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-white">
                                Password
                            </label>

                        </div>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-5 text-slate-500 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter your password"
                                className={`w-full pl-12 pr-12 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition `}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-5 text-slate-400 hover:text-white transition"
                            >
                                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                            </button>
                        </div>
                        
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        
                        className="w-full px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition transform hover:scale-105 disabled:hover:scale-100"
                    >
                       Login
                    </button>
                    {/* Signup Link */}
                    <div className="text-center pt-4">
                        <p className="text-slate-400">
                            Don't have an account?{' '}
                            <Link to="/Signup" className="text-blue-400 hover:text-blue-300 no-underline! transition font-semibold">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
