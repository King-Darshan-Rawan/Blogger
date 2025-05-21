import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import'./App.css'
import Blog from './pages/Blogs';
import BlogWrite from './pages/BlogWrite';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/blog-write" element={<BlogWrite/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
