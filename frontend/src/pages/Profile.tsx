import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Calendar, Camera, Lock, LogOut, Trash2, Save, X, AlertTriangle, Check } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [saved, setSaved] = useState(false)

  // Mock user data - replace with actual user data from context/API
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: null as string | null,
    accountCreated: 'January 15, 2024',
  })

  const [editedName, setEditedName] = useState(userData.fullName)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSave = () => {
    setUserData({ ...userData, fullName: editedName })
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCancel = () => {
    setEditedName(userData.fullName)
    setIsEditing(false)
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData({ ...userData, profilePicture: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordChange = () => {
    // Implement password change logic
    console.log('Password change requested')
    setShowPasswordModal(false)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log('Account deletion requested')
    setShowDeleteConfirm(false)
    // Redirect to landing page after deletion
    navigate('/')
  }

  const handleSignOut = () => {
    // Implement sign out logic
    console.log('Sign out requested')
    navigate('/login')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account information and preferences</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 rounded-xl flex items-center gap-3 animate-fade-in" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)' }}>
          <Check className="w-5 h-5 text-emerald-400" />
          <p className="text-sm text-emerald-400 font-medium">Profile updated successfully!</p>
        </div>
      )}

      {/* User Information Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <User className="w-5 h-5" style={{ color: '#00F5FF' }} />
            User Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
              style={{ background: 'rgba(0,245,255,0.1)', color: '#00F5FF', border: '1px solid rgba(0,245,255,0.2)' }}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div
                className="w-32 h-32 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(138,43,226,0.2))', border: '2px solid rgba(0,245,255,0.3)' }}
              >
                {userData.profilePicture ? (
                  <img src={userData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16" style={{ color: '#00F5FF' }} />
                )}
              </div>
              <label
                htmlFor="profile-picture"
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl"
              >
                <Camera className="w-8 h-8 text-white" />
              </label>
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">Click to change photo</p>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="input w-full"
                />
              ) : (
                <p className="text-white font-medium">{userData.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <p className="text-white font-medium">{userData.email}</p>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,245,255,0.1)', color: '#00F5FF' }}>
                  Verified
                </span>
              </div>
            </div>

            {/* Account Created */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Member Since</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <p className="text-white font-medium">{userData.accountCreated}</p>
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="btn px-4 py-2 text-sm font-bold text-black"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #0080ff)', boxShadow: '0 0 15px rgba(0,245,255,0.3)' }}
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="btn px-4 py-2 text-sm"
                  style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.2)' }}
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Management Section */}
      <div className="card p-6">
        <h2 className="text-lg font-black text-white flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5" style={{ color: '#00F5FF' }} />
          Account Management
        </h2>

        <div className="space-y-3">
          {/* Change Password */}
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full p-4 rounded-xl text-left flex items-center justify-between transition-all hover:-translate-y-0.5"
            style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,245,255,0.1)' }}>
                <Lock className="w-5 h-5" style={{ color: '#00F5FF' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Change Password</p>
                <p className="text-xs text-slate-500">Update your account password</p>
              </div>
            </div>
            <span className="text-slate-500">→</span>
          </button>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full p-4 rounded-xl text-left flex items-center justify-between transition-all hover:-translate-y-0.5"
            style={{ background: 'rgba(138,43,226,0.04)', border: '1px solid rgba(138,43,226,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(138,43,226,0.1)' }}>
                <LogOut className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sign Out</p>
                <p className="text-xs text-slate-500">Sign out from your account</p>
              </div>
            </div>
            <span className="text-slate-500">→</span>
          </button>

          {/* Delete Account */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full p-4 rounded-xl text-left flex items-center justify-between transition-all hover:-translate-y-0.5"
            style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Delete Account</p>
                <p className="text-xs text-slate-500">Permanently delete your account and all data</p>
              </div>
            </div>
            <span className="text-slate-500">→</span>
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowPasswordModal(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md p-6 rounded-2xl animate-fade-in"
            style={{ background: '#0A0A1A', border: '1px solid rgba(0,245,255,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="input w-full"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="input w-full"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="input w-full"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 btn py-2.5 text-sm font-bold text-black"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #0080ff)', boxShadow: '0 0 15px rgba(0,245,255,0.3)' }}
                >
                  Update Password
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="btn px-4 py-2.5 text-sm"
                  style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.2)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md p-6 rounded-2xl animate-fade-in"
            style={{ background: '#0A0A1A', border: '1px solid rgba(239,68,68,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Delete Account?</h3>
            </div>

            <p className="text-slate-400 mb-6">
              This action cannot be undone. All your data, including interview history, saved questions, and progress will be permanently deleted.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 btn py-2.5 text-sm font-bold"
                style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn px-4 py-2.5 text-sm"
                style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.2)' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
