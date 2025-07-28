import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Debates from './pages/Debates'
import DebateRoom from './pages/DebateRoom'
import Profile from './pages/Profile'
import Premium from './pages/Premium'
import ExclusiveData from './pages/ExclusiveData'
import AuthModal from './components/AuthModal'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { showAuthModal } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/debates" element={<Debates />} />
        <Route path="/debate/:id" element={<DebateRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/data" element={<ExclusiveData />} />
      </Routes>
      {showAuthModal && <AuthModal />}
    </div>
  )
}

export default App