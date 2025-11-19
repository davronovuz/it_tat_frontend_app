import { Button as MuiButton } from '@mui/material'
import { Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Loading from '../../Loading'
import './Teachers.css'

import teacher4 from '../../assets/Moxinur-ustoz.JPG' // Fayl nomidagi noto'g'ri belgi to'g'rilandi
import teacher2 from '../../assets/Nushofarin-ustoz.png'
import teacher3 from '../../assets/Shaxzod-akajon.JPG'
import teacher1 from '../../assets/Shoxrux-ustoz.JPG'
import belgiImage from '../../assets/teamBelgi.png'
import teamImage from '../../assets/teamImage1.png'
import useFatch from '../../components/useFatch'
import Feedback from '../boshSahifa/feedback/Feedback'

const images = [teacher1, teacher2, teacher3, teacher4]

// apimentors

const Teachers = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [modal, contextHolder] = Modal.useModal()
	const [swiperInstance, setSwiperInstance] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const videoRef = useRef(null)

	const { data: feedbak_video } = useFatch(
		'apifeedback-mentors',
		'feedback-mentors'
	)

	useEffect(() => {
		document.title = 'Ustozlar'
		const timer = setTimeout(() => setLoading(false), 1000)

		return () => clearTimeout(timer)
	}, [])

	// ? backend
	const {
		data: teachersInformation,
		isLoading,
		isError,
	} = useFatch('apimentors')

	console.log(teachersInformation, 'teacherInformation')

	return (
		<div className='teachers pages_big_div'>
			{loading ? (
				<Loading />
			) : (
				<div>
					<div className='max-width'>
						{contextHolder}
						<h1 className='font-size-48'>
							Kuchli bilimga <br /> ega ustozlar
						</h1>

						<div className='cards_container'>
							{teachersInformation?.map(teacher => (
								<div key={teacher.id} className='teacher_card'>
									<img src={teacher.image} alt='' />
									<p className='font-size-20'>{teacher.full_name}</p>
									<p className='font-size-18'>{teacher.description}</p>
									<MuiButton
										className='button'
										onClick={() => navigate(`/ustozlar/ustoz/${teacher.id}`)}
									>
										Batafsil ma`lumot
									</MuiButton>
								</div>
							))}
						</div>

					<div className="oquvchilar-fikri">

					<Feedback/>
					</div>
					</div>

					<Modal
						// title="Bu videolar tez oradi saytga qo`yiladi"
						open={isModalOpen}
						onCancel={() => {
							if (videoRef.current) videoRef.current.pause()
							setIsModalOpen(false)
						}}
						footer={null}
					>
						{feedbak_video?.map((video, index) => (
							<div className='video' key={index}>
								<i
									onClick={() => {
										if (videoRef.current) videoRef.current.pause()
										setIsModalOpen(false)
									}}
									className='bx bx-x video-close'
								></i>
								<video ref={videoRef} controls autoPlay>
									<source src={video.video_url} type='video/mp4' />
								</video>
							</div>
						))}
					</Modal>

					<div className='max-width'>
						<div className='teamSection'>
							<div className='team-inform'>
								<div className='belgiImage'>
									<img src={belgiImage} alt='' />
								</div>
								<h1>
									Ustoz bilan birga harakat qilganda, har bir to'siqni yengib
									o'tish osonroq bo'ladi.
								</h1>
								<h2>Millon Zahino</h2>
								<h3>Behavioral Science</h3>
							</div>
							<div className='teamImage'>
								<img src={teamImage} alt='' />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Teachers
