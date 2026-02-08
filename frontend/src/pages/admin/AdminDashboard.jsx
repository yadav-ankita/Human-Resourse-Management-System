import React, { useState } from 'react'
import { useGlobalContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiSearch, FiLogOut, FiUsers, FiCalendar, FiDollarSign, FiBarChart2, FiUserPlus, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const sampleEmployees = new Array(9).fill(0).map((_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  title: 'Software Engineer',
  status: i % 3 === 0 ? 'present' : i % 3 === 1 ? 'on leave' : 'absent',
  email: `employee${i + 1}@company.com`,
  phone: `+1 555-01${String(i + 1).padStart(2, '0')}`,
}))

const AdminDashboard = () => {
  const { userData, logout } = useGlobalContext()
  const navigate = useNavigate()
  const [employees] = useState(sampleEmployees)
  const [activeNav, setActiveNav] = useState('overview')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const onLogout = async () => {
    await logout()
    navigate('/')
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FiBarChart2 },
    { id: 'attendance', label: 'Attendance', icon: FiCalendar },
    { id: 'leaves', label: 'Leaves', icon: FiAlertCircle },
    { id: 'payroll', label: 'Payroll', icon: FiDollarSign },
  ]

  const stats = [
    { label: 'Total Employees', value: employees.length, icon: FiUsers, color: 'bg-blue-500' },
    { label: 'Present Today', value: employees.filter(e => e.status === 'present').length, icon: FiCheckCircle, color: 'bg-green-500' },
    { label: 'On Leave', value: employees.filter(e => e.status === 'on leave').length, icon: FiCalendar, color: 'bg-yellow-500' },
    { label: 'Pending Requests', value: 3, icon: FiAlertCircle, color: 'bg-red-500' },
  ]

  const quickActions = [
    { label: 'Add New Employee', icon: FiUserPlus, color: 'bg-blue-600', action: () => navigate('/admin/add-employee') },
    { label: 'Review Leaves', icon: FiCalendar, color: 'bg-yellow-600', action: () => setActiveNav('leaves') },
    { label: 'Attendance', icon: FiCheckCircle, color: 'bg-green-600', action: () => setActiveNav('attendance') },
    { label: 'View Reports', icon: FiBarChart2, color: 'bg-purple-600', action: () => {} },
  ]

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Left Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 fixed lg:relative h-full z-40`}>
        {/* Company Name / Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && <div className="font-bold text-xl text-blue-400">HR System</div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-slate-400 hover:text-slate-200">
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                  activeNav === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} className="shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 transition"
          >
            <FiLogOut size={20} className="shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:hidden text-slate-400 hover:text-slate-200"
          >
            <FiMenu size={24} />
          </button>
          
          {/* Search Bar */}
          <div className="flex-1 mx-6">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <div className="font-semibold text-sm">{userData?.username ?? 'Admin'}</div>
                <div className="text-xs text-slate-400">Administrator</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold">
                {userData?.username?.[0] ?? 'A'}
              </div>
            </div>
            <button className="sm:hidden w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold">
              {userData?.username?.[0] ?? 'A'}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="bg-slate-900 rounded-lg p-6 border border-slate-800 hover:border-slate-700 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                        <div className="text-3xl font-bold mt-2">{stat.value}</div>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={idx}
                      onClick={action.action}
                      className={`${action.color} rounded-lg p-4 text-white font-semibold flex items-center gap-3 hover:opacity-90 transition transform hover:scale-105`}
                    >
                      <Icon size={20} />
                      <span className="text-sm">{action.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Employees Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Employees</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => setSelected(emp)}
                    className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-blue-500 hover:shadow-lg transition transform hover:scale-105"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{emp.name}</div>
                        <div className="text-sm text-slate-400">{emp.title}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        emp.status === 'present' ? 'bg-green-500' :
                        emp.status === 'on leave' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Employee Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-lg p-6 w-full max-w-md border border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-2xl font-bold">{selected.name}</div>
                <div className="text-sm text-slate-400">{selected.title}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-semibold">{selected.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-semibold">{selected.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Login ID:</span>
                <span className="font-semibold">emp{selected.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className={`font-semibold capitalize ${
                  selected.status === 'present' ? 'text-green-400' :
                  selected.status === 'on leave' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>{selected.status}</span>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
