import { useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './Feedback.css'

import fikrImgOne from '../../../assets/oquvchi-bir.png'
import fikrImgTwoo from '../../../assets/oquvchi-ikki.png'
import fikrImgThree from '../../../assets/oquvchi-uch.png'
import fikrImgFour from '../../../assets/oquvchi-tort.png'

import { Modal } from 'antd'
import useFatch from '../../../components/useFatch'

const fikrlar = [fikrImgOne, fikrImgTwoo, fikrImgThree, fikrImgFour]

const Feedback = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [activeVideo, setActiveVideo] = useState(null)
	const [swiperInstance, setSwiperInstance] = useState(null)
	const videoRef = useRef(null)

	const { data: feedbak_video } = useFatch('apifeedback-mentors', 'feedback-mentors')

	const videosArray = Array.isArray(feedbak_video)
		? feedbak_video
		: Object.values(feedbak_video || {})
	
	return (
		<div className='background'>
			<div className='max-width'>
				<div className='feedback'>
					<h2 className='font-size-40 feedback-title'>
						Feedback, O‘quvchilar <br /> va ota-onalar fikrlari
					</h2>
					<h2 className='feedback-title-2'>
						 O‘quvchilar muvofaqiyatlari

					</h2>
					<div className='container'>
						<Swiper
							onSwiper={setSwiperInstance}
							spaceBetween={30}
							pagination={{ clickable: true }}
							modules={[Pagination]}
							className='mySwiper'
							breakpoints={{
								400: { slidesPerView: 1, spaceBetween: 10 },
								768: { slidesPerView: 2, spaceBetween: 20 },
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

										{/* Har bir fikr uchun alohida modal */}
										<Modal
											open={isModalOpen && activeVideo === video?.video_url}
											onCancel={() => {
												if (videoRef.current) videoRef.current.pause()
												setIsModalOpen(false)
												setActiveVideo(null)
											}}
											footer={null}
										>
											<div className='video'>
												<i
													onClick={() => {
														if (videoRef.current) videoRef.current.pause()
														setIsModalOpen(false)
														setActiveVideo(null)
													}}
													className='bx bx-x video-close'
												></i>
												{video && (
													<video className='res-vid' ref={videoRef} controls autoPlay>
														<source src={video.video_url} type='video/mp4' />
													</video>
												)}
											</div>
										</Modal>
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
			</div>
		</div>
	)
}

export default Feedback
