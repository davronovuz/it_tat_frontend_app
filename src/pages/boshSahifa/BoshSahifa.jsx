import { Helmet } from 'react-helmet-async'
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
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>IT TAT | Samarqanddagi IT o‘quv markazi</title>
        <meta
          name="description"
          content="IT TAT — Samarqanddagi zamonaviy IT o‘quv markazi. Frontend, Backend va online IT kurslari."
        />
        <link rel="canonical" href="https://it-tat.uz/" />

        {/* Open Graph */}
        <meta property="og:title" content="IT TAT | Samarqanddagi IT o‘quv markazi" />
        <meta property="og:description" content="Frontend, Backend va online IT kurslarini o‘rganing. Tajribali ustozlar bilan Samarqanddagi IT TAT markazi." />
        <meta property="og:url" content="https://it-tat.uz/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT TAT | Samarqanddagi IT o‘quv markazi" />
        <meta name="twitter:description" content="Frontend, Backend va online IT kurslarini o‘rganing. Tajribali ustozlar bilan Samarqanddagi IT TAT markazi." />

        {/* Structured Data (Schema.org) */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "IT TAT",
            "url": "https://it-tat.uz/",
            "logo": "https://ittat.uz/logo192.png",
            "sameAs": [
              "https://t.me/ittat",
              "https://www.instagram.com/ittat.uz/"
            ],
            "description": "Samarqanddagi zamonaviy IT o‘quv markazi. Frontend, Backend va online IT kurslari bilan ta’lim."
          }
          `}
        </script>
      </Helmet>

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
    </>
  )
}

export default BoshSahifa
