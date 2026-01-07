import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from 'antd'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './LichTeacher.css'

import Loading from '../../Loading'
import useFatch from '../../components/useFatch'

// ? images
import mercor from '../../assets/freelance.jpg'
import itTat from '../../assets/logoSvg.svg'
import nap from '../../assets/remove-nat.png'
import itPark from '../../assets/parkIt.png'
// import img_tat from '../../assets/photo_tat.jpg'
import texnomart from '../../assets/tex.png'
import doWork from '../../assets/union.jpg'
import designStudio from '../../assets/design-studio.png'

import fikrImgOne from '../../assets/oquvchi-bir.png'
import fikrImgTwoo from '../../assets/oquvchi-ikki.png'
import fikrImgThree from '../../assets/oquvchi-uch.png'
import fikrImgFour from '../../assets/oquvchi-tort.png'

const fikrlar = [fikrImgOne, fikrImgTwoo, fikrImgThree, fikrImgFour]

const LichTeacher = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [loading, setLoading] = useState(true)
	const [swiperInstance, setSwiperInstance] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [activeVideo, setActiveVideo] = useState(null)
	const videoRef = useRef(null)

	useEffect(() => {
		document.title = 'Ustoz'
		const timer = setTimeout(() => setLoading(false), 1000)
		return () => clearTimeout(timer)
	}, [])

	// API so‘rovlar
	const { data: teachersInformationId } = useFatch(`apimentors/${id}`, 'testing')
	const { data: feedbak_video } = useFatch('apifeedback-mentors', 'feedback-mentors')

	const videosArray = Array.isArray(feedbak_video)
		? feedbak_video
		: Object.values(feedbak_video || {})

			const unionStyle = {
		width: '150px',
		height:'150px',
		borderRadius: '50%',
	}

	return (
		<div className='lichTeacher pages_big_div'>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className='background_m_g'>
						<div className='max-width'>
							<div className='display dis_flex' onClick={() => navigate(-1)}>
								<i className='bx bx-chevron-left font-size-24 -600'></i>
								<p className='font-size-20'>Ustozlar</p>
							</div>

							{/* === Teacher === */}
							{teachersInformationId && (
								<div className='teacher_cont'>
									<div className='teacher_img'>
										<img src={teachersInformationId?.image} alt='Teacher' />
									</div>
									<div className='teacher_about'>
										<h1 className='font-size-48'>
											{teachersInformationId?.full_name}
										</h1>
										<p className='font-size-24-600'>
											{teachersInformationId?.description}
										</p>

										<div className='teacher_information'>
											<div className='happy_students'>
												<p className='font-size-18-600'>Mamnun o‘quvchilar</p>
												<h2 className='font-size-40'>
													+{teachersInformationId.students_count}
												</h2>
											</div>
											<div className='experience'>
												<p className='font-size-18-600'>Tajribasi</p>
												<h2 className='font-size-40'>
													{teachersInformationId.experience_years} yil
												</h2>
											</div>
											<div className='Completed_Projects'>
												<p className='font-size-18-600'>
													Tugallangan loyihalar
												</p>
												<h2 className='font-size-40'>+13</h2>
											</div>
											<div className='awards_won'>
												<p className='font-size-18-600'>Mukofotlari</p>
												<h2 className='font-size-40'>+43</h2>
											</div>
										</div>

										{teachersInformationId.courses?.map((course, idx) => (
											<p key={idx} className='font-size-18-500 color_black'>
												{course?.description}
											</p>
										))}
									</div>
								</div>
							)}

							{/* === Portfolio === */}
							{teachersInformationId?.portfolios && (
								<div className='teacher_portfolio'>
									<h1 className='font-size-48'>Portfolio</h1>
									<div className='web_bar'>
										{teachersInformationId.portfolios.map(portfolio => (
											<div key={portfolio.id} className='web_div'>
												<img
													className='web_div_img'
													src={portfolio.image}
													alt='Website'
												/>
												<p className='font-size-24'>{portfolio.name}</p>
												<p className='font-size-18-500'>
													{portfolio.description}
												</p>
												<a href={portfolio.url}>{portfolio.url}</a>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* === Companies === */}
						<div className='background'>
							<div className='max-width'>
								<div className='work_Companies'>
									<h1 className='font-size-48'>
										Bitiruvchilarimiz ishlayotgan kompaniyalar
									</h1>
									<p className='font-size-20-600'>
										Sohadagi eng yaxshi bo‘sh ish o‘rinlarini to‘playmiz,
										talabalarni suhbatga tayyorlaymiz va sizni hamkor
										kompaniyalarga tavsiya qilamiz.
									</p>
									<br />
									<div className='work_menu'>
						<img src={mercor} alt='' />
						<img src={itPark} alt='' />
						<img src={itTat} alt='' />
						<img src={nap} alt='' />
						<img src={doWork} alt='' style={unionStyle} />
						<img src={texnomart} alt="texnomart" />
						<img src={designStudio} alt="design-studio" />
					</div>
								</div>
							</div>
						</div>

						{/* === Swiper: Feedback Videos === */}
						<div className='max-width'>
							<h1 className='font-size-48 h1-idea'>
								O‘quvchilarning ustoz haqida fikri
							</h1>

							<Swiper
								onSwiper={setSwiperInstance}
								spaceBetween={30}
								pagination={{ clickable: true }}
								modules={[Pagination]}
								className='mySwiper'
								breakpoints={{
									400: { slidesPerView: 1, spaceBetween: 10 },
									768: { slidesPerView: 1, spaceBetween: 20 },
									1024: { slidesPerView: 3, spaceBetween: 30 },
								}}
							>
								{fikrlar.map((fikr, index) => {
									const video = videosArray[index]
									return (
										<SwiperSlide key={index} className='swiper-slide'>
											<div className='swiper_el'>
												<img src={fikr} alt={`Fikr ${index + 1}`} />
												<p className='font-size-24 video_el_1'>
													O‘quvchi {index + 1}
												</p>
												<p className='font-size-18 video_element'>
													O‘quvchi fikri haqida qisqacha matn joylashadi
												</p>
												<button
													onClick={() => {
														setActiveVideo(video?.video_url)
														setIsModalOpen(true)
													}}
													className='play_button'
												>
													<i className='bx bx-play'></i>
												</button>
											</div>
										</SwiperSlide>
									)
								})}
							</Swiper>

							<div className='buttons'>
								<button
									className='button_1'
									onClick={() => swiperInstance?.slidePrev()}
								>
									<i className='bx bx-left-arrow-alt'></i>
								</button>
								<button
									className='button_1'
									onClick={() => swiperInstance?.slideNext()}
								>
									<i className='bx bx-right-arrow-alt'></i>
								</button>
							</div>
						</div>
					</div>

					{/* === Modal: Video from Backend === */}
					<Modal
						open={isModalOpen}
						onCancel={() => {
							if (videoRef.current) videoRef.current.pause()
							setIsModalOpen(false)
							setActiveVideo(null)
						}}
						footer={null}
						centered
						width={800}
						destroyOnClose
					>
						<div className='video'>
							{activeVideo ? (
								<video ref={videoRef} controls autoPlay width='100%'>
									<source src={activeVideo} type='video/mp4' />
								</video>
							) : (
								<p className='text-center'>Video topilmadi</p>
							)}
						</div>
					</Modal>
				</>
			)}
		</div>
	)
}

export default LichTeacher
