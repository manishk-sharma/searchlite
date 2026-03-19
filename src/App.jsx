import { Routes, Route } from 'react-router-dom'
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
import SmoothScroll from './components/SmoothScroll'
import './App.css'

function App() {
  return (
    <div className="app">
      <SmoothScroll>
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
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
          </Routes>
        </main>
        <Footer />
      </SmoothScroll>
    </div>
  )
}

export default App
