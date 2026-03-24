import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Consumer from './pages/Consumer'
import Freelancer from './pages/Freelancer'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import Team from './pages/Team'
import Recruitment from './pages/Recruitment'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import CreateAccount from './pages/CreateAccount'
import ServiceDetail from './pages/ServiceDetail'
import AdminDashboard from './pages/AdminDashboard'
import SmoothScroll from './components/SmoothScroll'
import './App.css'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/auxin')

  return (
    <div className="app">
      <SmoothScroll>
        <ScrollToTop />
        {!isAdminPage && <Navbar />}
        <main className={isAdminPage ? '' : 'main-content'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/consumer" element={<Consumer />} />
            <Route path="/freelancer" element={<Freelancer />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogPost />} />
            <Route path="/team" element={<Team />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auxin" element={<AdminDashboard />} />
          </Routes>
        </main>
        {!isAdminPage && <Footer />}
      </SmoothScroll>
    </div>
  )
}

export default App
