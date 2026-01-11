import { useEffect, useState } from 'react'

import Loading from '../../Loading'
import Hero from './hero/Hero'
import WhyChoosUs from './whychoosus/WhyChoosUs'
import Courses from './courses/Courses'
import Covorking from './cowerking/Covorking'
import EducationFormat from './educationformating/EducationFormat'
import Feedback from './feedback/Feedback'
import WhereWeAre from './whereweare/WhereWeAre'
import Registration from './registration/Registration'
import Faq from './faq/Faq'

import '../../App.css'

const BoshSahifa = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="boshSahifa">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Hero />
          <WhyChoosUs />
          <Courses />
          <Covorking />
          <EducationFormat />
          <Feedback />
          <WhereWeAre />
          <Registration />
          <Faq />
        </>
      )}
    </div>
  )
}

export default BoshSahifa
