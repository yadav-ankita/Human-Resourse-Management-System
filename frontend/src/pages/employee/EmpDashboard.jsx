import React, { useState } from 'react'
import { useGlobalContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiCalendar, FiFileText, FiLogOut, FiAlertCircle, FiCheckCircle, FiClock, FiBell, FiCoffee } from 'react-icons/fi'

const EmpDashboard = () => {
  const { userData, logout } = useGlobalContext()
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)

  const onLogout = async () => {
    await logout()
    navigate('/')
  }

  // Sample recent activities
  const recentActivities = [
    { id: 1, type: 'attendance', title: 'Checked In Successfully', time: '09:00 AM Today', icon: FiCheckCircle, color: 'text-green-400' },
    { id: 2, type: 'leave', title: 'Leave Request Approved', time: '2 days ago', icon: FiCheckCircle, color: 'text-green-400' },
    { id: 3, type: 'alert', title: 'Company Announcement', time: '1 week ago', icon: FiBell, color: 'text-blue-400' },
    { id: 4, type: 'reminder', title: 'Monthly Review Scheduled', time: '3 days from now', icon: FiClock, color: 'text-yellow-400' },
  ]

  // Quick access cards
  const quickCards = [
    {
      title: 'My Profile',
      description: 'View and edit profile',
      icon: FiUser,
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/profile'),
    },
    {
      title: 'Attendance',
      description: 'Check in/out & history',
      icon: FiCalendar,
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/emp/attendance'),
    },
    {
      title: 'Leave Requests',
      description: 'Apply & track leaves',
      icon: FiFileText,
      color: 'from-orange-500 to-orange-600',
      action: () => navigate('/emp/leave'),
    },
    {
      title: 'Logout',
      description: 'Sign out of system',
      icon: FiLogOut,
      color: 'from-red-500 to-red-600',
      action: onLogout,
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome, {userData?.username || 'Employee'}! 👋</h1>
            <p className="text-slate-400">Here's your Employee dashboard overview</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAlert(!showAlert)}
              className="relative p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              <FiBell size={24} />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg cursor-pointer hover:ring-2 hover:ring-blue-400">
              {userData?.username?.[0] || 'E'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {quickCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <button
              key={idx}
              onClick={card.action}
              className={`bg-linear-to-br ${card.color} rounded-lg p-6 text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col items-start justify-between h-48`}
            >
              <div className="flex items-start justify-between w-full mb-4">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="text-sm font-normal text-slate-100 opacity-90">{card.description}</p>
                </div>
              </div>
              <Icon size={40} className="self-end opacity-20" />
            </button>
          )
        })}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Status</p>
              <p className="text-2xl font-bold text-green-400">Present</p>
            </div>
            <FiCheckCircle size={32} className="text-green-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Work Hours</p>
              <p className="text-2xl font-bold text-blue-400">8.5 hrs</p>
            </div>
            <FiCoffee size={32} className="text-blue-400" />
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Leaves Left</p>
              <p className="text-2xl font-bold text-yellow-400">12</p>
            </div>
            <FiCalendar size={32} className="text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiBell size={24} className="text-blue-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const ActivityIcon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-700 last:border-0">
                  <div className={`mt-1 ${activity.color}`}>
                    <ActivityIcon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-100">{activity.title}</p>
                    <p className="text-sm text-slate-400">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FiAlertCircle size={20} className="text-orange-400" />
            Alerts
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded">
              <p className="font-semibold text-blue-300 text-sm">Annual Review</p>
              <p className="text-xs text-slate-400 mt-1">Your review is due on 28 Feb</p>
            </div>
            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded">
              <p className="font-semibold text-orange-300 text-sm">Document Pending</p>
              <p className="text-xs text-slate-400 mt-1">Submit your tax documents</p>
            </div>
            <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded">
              <p className="font-semibold text-green-300 text-sm">Training Available</p>
              <p className="text-xs text-slate-400 mt-1">New skill development courses ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Card */}
      <div className="mt-6 bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-bold mb-4">Quick Info</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-slate-400 text-xs mb-1">Employee ID</p>
            <p className="font-semibold">EMP001</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Department</p>
            <p className="font-semibold">Engineering</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Manager</p>
            <p className="font-semibold">John Doe</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Join Date</p>
            <p className="font-semibold">01 Jan 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmpDashboard
