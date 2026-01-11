// src/App.jsx
import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ScrollToTop from './components/ScrollToTop';
import Loading from './Loading';
import Footer from './pages/boshSahifa/footer/Footer';
import Header from './pages/boshSahifa/header/Header';

import BoshSahifa from './pages/boshSahifa/BoshSahifa';
import Registration from './pages/boshSahifa/registration/Registration';
import Kurslar from './pages/coursesAndPrice/Kurslar';
import LichTeacher from './pages/lichTeachers/LichTeacher';
import NotFound from './pages/notFound/NotFound';
import OnlineCourses from './pages/onlineCourses/OnlineCourses';
import ProgrammingCourse from './pages/programmingCourses/ProgrammingCourse';
import Teachers from './pages/Teachers/Teachers';

import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const location = useLocation();

  // Sahifa o'zgarganda yuqoriga ko'tarish (ScrollToTop bor bo'lsa, buni olib tashlashingiz ham mumkin)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Header />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<BoshSahifa />} />
          <Route path="/ustozlar" element={<Teachers />} />
          <Route path="/kurslar" element={<Kurslar />} />
          <Route path="/online-kurslar" element={<OnlineCourses />} />
          <Route path="/ustozlar/ustoz/:id" element={<LichTeacher />} />
          <Route path="/kurslar/kurs/:id" element={<ProgrammingCourse />} />
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
    </>
  );
}

export default App;
