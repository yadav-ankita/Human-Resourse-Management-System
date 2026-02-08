import { useState } from 'react'
import { FiEye, FiEyeOff, FiUpload } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/AppContext'
const Signup = () => {
    const { register } = useGlobalContext();
    const [formData, setFormData] = useState({
        companyName: '',
        hrName: '',
        hrEmail: '',
        hrPhone: '',
        hrPassword: '',
        confirmPassword: '',
        //companyLogo: null
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const validateForm = () => {
        const newErrors = {}

        // Company name validation
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required'
        } else if (formData.companyName.trim().length < 2) {
            newErrors.companyName = 'Company name must be at least 2 characters'
        }

        // HR name validation
        if (!formData.hrName.trim()) {
            newErrors.hrName = 'HR name is required'
        } else if (formData.hrName.trim().length < 2) {
            newErrors.hrName = 'HR name must be at least 2 characters'
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.hrEmail.trim()) {
            newErrors.hrEmail = 'Email is required'
        } else if (!emailRegex.test(formData.hrEmail)) {
            newErrors.hrEmail = 'Please enter a valid email address'
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10,}$/
        if (!formData.hrPhone.trim()) {
            newErrors.hrPhone = 'Phone number is required'
        } else if (!phoneRegex.test(formData.hrPhone.replace(/\D/g, ''))) {
            newErrors.hrPhone = 'Please enter a valid phone number (at least 10 digits)'
        }

        // Password validation
        if (!formData.hrPassword) {
            newErrors.hrPassword = 'Password is required'
        } else if (formData.hrPassword.length < 8) {
            newErrors.hrPassword = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])/.test(formData.hrPassword)) {
            newErrors.hrPassword = 'Password must contain lowercase letters'
        } else if (!/(?=.*[A-Z])/.test(formData.hrPassword)) {
            newErrors.hrPassword = 'Password must contain uppercase letters'
        } else if (!/(?=.*\d)/.test(formData.hrPassword)) {
            newErrors.hrPassword = 'Password must contain numbers'
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.hrPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API call
            const { companyName, hrName: name, hrEmail: email, hrPhone: phone, hrPassword: password, confirmPassword } = formData;
            await register({ companyName, name, email, phone, password, confirmPassword });
            setSuccessMessage('Signup successful! Redirecting to login...')
            setTimeout(() => {
                // Redirect to login page
                window.location.href = '/login'
            }, 2000)
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: 'An error occurred. Please try again.'
            }))
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Create Your Account</h1>
                    <p className="text-slate-300">Register your company and get started with Dayflow HRMS</p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                        {successMessage}
                    </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 space-y-6">

                    {/* Company Name */}
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-semibold text-white mb-2">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="Enter your company name"
                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition ${errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                                }`}
                        />
                        {errors.companyName && (
                            <p className="mt-1 text-sm text-red-400">{errors.companyName}</p>
                        )}
                    </div>

                    {/* HR Name */}
                    <div>
                        <label htmlFor="hrName" className="block text-sm font-semibold text-white mb-2">
                            HR Manager Name *
                        </label>
                        <input
                            type="text"
                            id="hrName"
                            name="hrName"
                            value={formData.hrName}
                            onChange={(e) => setFormData({ ...formData, hrName: e.target.value })}
                            placeholder="Enter HR manager's full name"
                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition ${errors.hrName ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                                }`}
                        />
                        {errors.hrName && (
                            <p className="mt-1 text-sm text-red-400">{errors.hrName}</p>
                        )}
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* HR Email */}
                        <div>
                            <label htmlFor="hrEmail" className="block text-sm font-semibold text-white mb-2">
                                HR Email *
                            </label>
                            <input
                                type="email"
                                id="hrEmail"
                                name="hrEmail"
                                value={formData.hrEmail}
                                onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                                placeholder="Enter email address"
                                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition ${errors.hrEmail ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                                    }`}
                            />
                            {errors.hrEmail && (
                                <p className="mt-1 text-sm text-red-400">{errors.hrEmail}</p>
                            )}
                        </div>

                        {/* HR Phone */}
                        <div>
                            <label htmlFor="hrPhone" className="block text-sm font-semibold text-white mb-2">
                                HR Phone Number *
                            </label>
                            <input
                                type="tel"
                                id="hrPhone"
                                name="hrPhone"
                                value={formData.hrPhone}
                                onChange={(e) => setFormData({ ...formData, hrPhone: e.target.value })}
                                placeholder="Enter phone number"
                                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition ${errors.hrPhone ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                                    }`}
                            />
                            {errors.hrPhone && (
                                <p className="mt-1 text-sm text-red-400">{errors.hrPhone}</p>
                            )}
                        </div>
                    </div>

                    {/* Password and Confirm Password Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* HR Password */}
                        <div>
                            <label htmlFor="hrPassword" className="block text-sm font-semibold text-white mb-2">
                                Password *
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="hrPassword"
                                    name="hrPassword"
                                    value={formData.hrPassword}
                                    onChange={(e) => setFormData({ ...formData, hrPassword: e.target.value })}
                                    placeholder="Enter password"
                                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition pr-10 ${errors.hrPassword ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-5 text-slate-400 hover:text-white transition"
                                >
                                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.hrPassword && (
                                <p className="mt-1 text-sm text-red-400">{errors.hrPassword}</p>
                            )}
                            <p className="mt-2 text-xs text-slate-400">
                                Minimum 8 characters, including uppercase, lowercase, and numbers
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-2">
                                Confirm Password *
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="Confirm password"
                                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-5 top-5 text-slate-400 hover:text-white transition"
                                >
                                    {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                            {errors.submit}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-lg transition transform hover:scale-105 disabled:hover:scale-100"
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {/* Login Link */}
                    <div className="text-center pt-4 border-t border-slate-700">
                        <p className="text-slate-400">
                            Already have an account?{' '}
                            <Link to="/Login" className="text-blue-400 hover:text-blue-300 no-underline! transition font-semibold">
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
