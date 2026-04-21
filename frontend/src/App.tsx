import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AppLayout from './layouts/AppLayout'
import DashboardWithTimeline from './pages/DashboardWithTimeline'
import Generate from './pages/Generate'
import History from './pages/History'
import Saved from './pages/Saved'
import MockInterview from './pages/MockInterview'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardWithTimeline />} />
          <Route path="generate"  element={<Generate />} />
          <Route path="history"   element={<History />} />
          <Route path="saved"     element={<Saved />} />
          <Route path="interview" element={<MockInterview />} />
          <Route path="profile"   element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
