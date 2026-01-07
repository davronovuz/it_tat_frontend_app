// src/App.jsx
import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'

import ScrollToTop from './components/ScrollToTop'
import Loading from './Loading'
import Header from './pages/boshSahifa/header/Header'
import Footer from './pages/boshSahifa/footer/Footer'

// Pages
import BoshSahifa from './pages/boshSahifa/BoshSahifa'
import Kurslar from './pages/coursesAndPrice/Kurslar'
import Teachers from './pages/Teachers/Teachers'
import LichTeacher from './pages/lichTeachers/LichTeacher'
import OnlineCourses from './pages/onlineCourses/OnlineCourses'
import ProgrammingCourse from './pages/programmingCourses/ProgrammingCourse'
import Registration from './pages/boshSahifa/registration/Registration'
import NotFound from './pages/notFound/NotFound'

// Styles
import 'antd/dist/reset.css'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const location = useLocation()

  // Route o‘zgarganda tepaga chiqish
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Header />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<BoshSahifa />} />
          <Route path="/kurslar" element={<Kurslar />} />
          <Route path="/kurslar/kurs/:id" element={<ProgrammingCourse />} />
          <Route path="/ustozlar" element={<Teachers />} />
          <Route path="/ustozlar/ustoz/:id" element={<LichTeacher />} />
          <Route path="/online-kurslar" element={<OnlineCourses />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </HelmetProvider>
  )
}

export default App
