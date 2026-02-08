import React from 'react'
import { FiUsers, FiCalendar, FiCheck, FiTrendingUp, FiClock, FiAlertCircle } from 'react-icons/fi'
import { Link, Navigate } from 'react-router'
import { useGlobalContext } from '../context/AppContext'
const Home = () => {
  const {userData}=useGlobalContext();
  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Employee Management",
      description: "Streamline onboarding, profiles, and employee data management"
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Leave Management",
      description: "Simplified leave requests, approvals, and tracking"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Attendance Tracking",
      description: "Real-time attendance monitoring and reports"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Payroll Visibility",
      description: "Transparent salary structures and payroll processing"
    },
    {
      icon: <FiCheck className="w-8 h-8" />,
      title: "Approval Workflows",
      description: "Efficient approval process for admins and HR officers"
    },
  ]
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      {userData && <Navigate to="/Dashboard"/>}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Dayflow</span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition no-underline!">Features</a>
              <a href="#benefits" className="text-slate-300 hover:text-white transition no-underline!">Benefits</a>
              <a href="#cta" className="text-slate-300 hover:text-white transition no-underline!">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/50">
              ✨ Modern HRMS Solution
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Every Workday,
            <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Perfectly Aligned</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Streamline your HR operations with Dayflow - a comprehensive Human Resource Management System designed to digitize and simplify every aspect of employee management.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Link to="/Login">
            <button className="px-8 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition transform
               
            ">
              Get Started Today
            </button>
            </Link>
            <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition border border-slate-600">
              Learn More
            </button>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="bg-slate-800/50 border-t border-slate-700 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-300">
              Everything you need to manage your workforce effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-slate-700/50 border border-slate-600 p-8 rounded-xl hover:border-blue-500/50 transition cursor-pointer hover:bg-slate-700/80"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-500/30 transition mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Dayflow?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { title: "Save Time", desc: "Automate repetitive HR tasks and focus on strategic initiatives" },
              { title: "Improve Accuracy", desc: "Eliminate manual errors with automated processes and validations" },
              { title: "Better Insights", desc: "Access real-time analytics for data-driven decision making" }
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{benefit.title}</h4>
                  <p className="text-slate-400 text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {[
              { title: "Secure & Compliant", desc: "Enterprise-grade security with latest compliance standards" },
              { title: "Easy Integration", desc: "Seamlessly integrate with your existing HR systems" },
              { title: "24/7 Support", desc: "Dedicated support team available round the clock" }
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{benefit.title}</h4>
                  <p className="text-slate-400 text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-linear-to-r from-blue-600/20 to-purple-600/20 border-t border-slate-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your HR Operations?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join organizations that trust Dayflow for their HR management needs.
          </p>
          <Link to="/Login">
          <button
         
          className="px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105 text-lg">
            Get Started Today

          </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <FiTrendingUp className="text-white" />
                </div>
                <span className="text-lg font-bold text-white">Dayflow</span>
              </div>
              <p className="text-slate-400 text-sm">Every workday, perfectly aligned.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 ml-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition no-underline!">Features</a></li>
                <li><a href="#" className="hover:text-white transition no-underline!">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition no-underline!">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition no-underline!">About</a></li>
                <li><a href="#" className="hover:text-white transition  no-underline!">Blog</a></li>
                <li><a href="#" className="hover:text-white transition  no-underline!">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 ml-7">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition no-underline!">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition no-underline!">Terms</a></li>
                <li><a href="#" className="hover:text-white transition no-underline!">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2026 Dayflow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
