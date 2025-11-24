import React, { useEffect, useState } from 'react'
import EducationFormat from '../boshSahifa/educationformating/EducationFormat'
import Result from '../boshSahifa/result/Result'
import WhyChoosUs from '../boshSahifa/whychoosus/WhyChoosUs'
import { Button as MuiButton } from '@mui/material'
import { Modal } from 'antd'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loading from '../../Loading'
import useFatch from '../../components/useFatch'
import './Kurslar.css'

const Kurslar = () => {
	const location = useLocation()
	const { id } = useParams()
	const navigate = useNavigate()

	const [modal, contextHolder] = Modal.useModal()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		document.title = 'Kurslar'
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1000)
		window.scrollTo(0, 0)
		return () => clearTimeout(timer)
	}, [])

	const {
		data: coursesAndPriceData,
		isLoading,
		error,
	} = useFatch('apimentors/', 'testinCourses')

	if (loading || isLoading) {
		return <Loading />
	}

	return (
		<div className='pages_big_div'>
			{contextHolder}

			<div className='background_m_g'>
				<div className='max-width'>
					<div className='kurslar'>
						<h1 className='font-size-40'>Kurslar</h1>

						<div className='between'>
							{coursesAndPriceData?.map((mentor, index) => {
								// mentor.courses mavjud bo‘lsa, birinchi kursni olamiz
								const firstCourse = mentor?.courses?.[0]

								return (
									<div className='between_fist_div' key={index}>
										{/* Chap qism */}
										<div className='grid-item min_div'>
											<img
											
												src={mentor.image}
												alt={mentor.full_name || 'Mentor rasmi'}
											/>
											<br /><br />
											<div className='min_div_none'>
												<h2 className='font-size-20 teacher_full_name'>
													{mentor.full_name}
												</h2>
												<p className='font-size-18-500'>
													{mentor.description}
												</p>
											</div>
										</div>

										<div className='heightlinear'></div>

										{/* O‘ng qism */}
										<div className='grid-item max_div'>
											<div className='display'>
												<h2 className='font-size-20'>
													{mentor.description}
												</h2>

												{firstCourse && (
													<MuiButton
														className='button'
														onClick={() =>
															navigate(`/kurslar/kurs/${firstCourse.id}`)
														}
													>
														Batafsil ma’lumot
													</MuiButton>
												)}
											</div>

											<hr />

											<h2 className='def_none font-size-20'>{mentor.title}</h2>
											<p className='font-size-18-500'>
												<br />
												Bizning mentorlarimiz xalqaro darajadagi mutaxassislar
												bo‘lib, o‘z sohasida katta tajribaga ega.
											</p>

											{/* Kurs ma’lumotlari */}
											<div className='grid_bar'>
												{mentor?.courses?.map((course) => (
													<React.Fragment key={course.id}>
														<div className='month'>
															<span className='font-size-20'>
																Kurs davomiyligi
															</span>
															<p className='font-size-20'>
																{course.duration_months} oy
															</p>
														</div>

														<div className='time'>
															<span className='font-size-20'>
																Dars boshlanish soati
															</span>
															<p className='font-size-20'>-------</p>
														</div>

														<div className='times'>
															<span className='font-size-20'>Haftada</span>
															<p className='font-size-20'>
																{course.weekly_hours} kun
															</p>
														</div>

														<div className='clock'>
															<span className='font-size-20'>Necha soat</span>
															<p className='font-size-20'>
																{course.duration_hours} soat
															</p>
														</div>
													</React.Fragment>
												))}
											</div>

											{/* Pastdagi bitta tugma (mobil uchun) */}
											{firstCourse && (
												<div className='batafsil_malumot_button_2'>
													<MuiButton
														className='button button_block dis_none'
														onClick={() =>
															navigate(`/kurslar/kurs/${firstCourse.id}`)
														}
													>
														Batafsil ma’lumot
													</MuiButton>
												</div>
											)}
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>

			{/* Pastgi komponentlar */}
			<EducationFormat />
			<WhyChoosUs />
			<Result />
		</div>
	)
}

export default Kurslar
