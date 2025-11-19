import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { WiStars } from 'react-icons/wi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import * as Yup from 'yup'
import Loading from '../../Loading'
import info from '../../assets/info.png'
import olx from '../../assets/olx.svg'
import rabota from '../../assets/rabota.svg'
import useFatch from '../../components/useFatch'
import usePost from '../../components/usePost'
import Result from '../boshSahifa/result/Result'
import './ProgrammingCourse.css'

const ProgrammingCourse = () => {
	const Navigate = useNavigate()
	const { id } = useParams()

	const { data: courseById } = useFatch(`apicourses/${id}/`, 'test')
	const postUser = usePost('apiregistrations/')

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState(true)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [phoneError, setPhoneError] = useState(false)
	const [status, setStatus] = useState(null)

	useEffect(() => {
		document.title = 'Kurs'
		let timer = setTimeout(() => setLoading(false), 1000)
		window.scrollTo(0, 0)
		return () => clearTimeout(timer)
	}, [])

	const notifySuccess = () => {
		toast.success('Muvaffaqiyatli ro‘yxatdan o‘tildi!')
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const phoneSchema = Yup.object().shape({
			phone: Yup.string()
				.matches(/^\+998\d{9}$/, "Telefon raqamini +998 bilan to'g'ri kiriting")
				.required('Telefon raqami majburiy'),
		})

		const formattedPhone = phone.startsWith('+998') ? phone : `+998${phone}`

		try {
			await phoneSchema.validate({ phone: formattedPhone })

			if (name.trim() === '') {
				toast.error('Ismingizni kiriting')
				return
			}

			const dataPost = {
				name: name,
				phone_number: formattedPhone,
			}

			postUser.mutate(dataPost, {
				onSuccess: () => {
					toast.success('Muvaffaqiyatli ro‘yxatdan o‘tildi!', {
						autoClose: 3000,
					})
					setName('')
					setPhone('')
					notifySuccess()
				},
				onError: error => {
					toast.error(error.message || 'Xatolik yuz berdi')
				},
			})
		} catch (err) {
			toast.error(err.message || 'Ma’lumotlar xato kiritildi')
		}
	}

	return (
		<div className='ProgrammingCourse pages_big_div'>
			{loading ? (
				<Loading />
			) : (
				<>
					{/* Kurs haqida qisqacha ma'lumot */}
					<div className='background_m_g'>
						<div className='max-width'>
							<ToastContainer position='top-right' autoClose={3000} />
							<div className='display go-back' onClick={() => Navigate(-1)}>
								<i className='bx bx-chevron-left font-size-24 -600'></i>
								<p className='font-size-20'>orqaga qaytish</p>
							</div>
							<div className='course_about'>
								<div className='course_about_left_div'>
									<img src={courseById?.image} alt={courseById?.title} />
								</div>
								<div className='course_about_right_div'>
									<h1 className='font-size-48'>{courseById?.title}</h1>
									<p className='font-size-18-500'>{courseById?.description}</p>
									<div className='display'>
										<h4 className='font-size-32'>
											Ai <WiStars />
										</h4>
										<p className='p_m_w font-size-16-600'>
											Endi barcha kurslarimizda sun'iy intellekt bo‘yicha
											darslar mavjud!
										</p>
									</div>
									<div className='course_inform'>
										<h2 className='font-size-40'>
											{courseById?.duration_months} oy
										</h2>
										<h2 className='font-size-40'>
											{courseById?.weekly_hours} kun
										</h2>
										<h2 className='font-size-40'>
											{courseById?.duration_hours} soat
										</h2>
										<h2 className='font-size-40 course_inform_6_child'>
  											{Number(courseById?.price_per_month).toLocaleString('uz-UZ')} so‘m
										</h2>

										<button
											onClick={() => setIsModalOpen(true)}
											className='course_inform_button res-none'
										>
											Kursga yozilish
										</button>
									</div>
									<button
										onClick={() => setIsModalOpen(true)}
										className='course_inform_button max-none res-block'
									>
										Kursga yozilish
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Ma'lumotlarni yuborish formasi */}
					<div className='background_blue'>
						<div className='max-width'>
							<div className='drop_info'>
								<div className='drop_info_left_div'>
									<img className='drop_info_img' src={info} alt='' />
								</div>
								<form className='hero_from' onSubmit={handleSubmit}>
									<h2>Bepul konsultatsiya</h2>
									<p className='font-size-18-500'>
										Aloqa ma'lumotlaringizni qoldiring, va mutaxassisimiz siz
										bilan bog'lanadi.
									</p>
									<br />
									<input
										className={`font-size-16 ${
											name.trim() === '' && status === 'error'
												? 'input-error'
												: ''
										}`}
										type='text'
										placeholder='Sizning ismingiz'
										value={name}
										onChange={e => setName(e.target.value)}
										required
									/>
									<br />
									<input
										className={`font-size-16 ${
											phone.length === 13 && !phoneError
												? 'bor-green'
												: phone.length > 0
												? 'bor-red'
												: ''
										}`}
										type='text'
										placeholder='(+998901234567)'
										value={phone}
										onChange={e => setPhone(e.target.value)}
										required
									/>
									<br />
									<br />
									<button type='submit' className='font-size-18-500'>
										Ro‘yxatdan o‘tish
									</button>
								</form>
							</div>
						</div>
					</div>

					{/* Texnologiyalar */}
					<div className='background'>
						<div className='max-width'>
							<div className='technologies'>
								<h2 className='font-size-40'>O`tiladigan texnologiyalar</h2>
								{courseById?.technologies?.length > 0 ? (
									<div className='wrap'>
										{courseById.technologies.map((technolog, index) => (
											<div className='technologies_bar' key={index}>
												<button
													className='course_btn font-size-32'
													onClick={() => Navigate('/kurslar')}
												>
													{technolog?.title}
												</button>
											</div>
										))}
									</div>
								) : (
									<div>Texnologiyalar mavjud emas yoki yuklanmoqda...</div>
								)}
							</div>
						</div>
					</div>
					<Result />

					{/* IT sohasidagi talab */}
					<div className='background_blue'>
						<div className='max-width'>
							<div className='info-container'>
								<h2 className=' font-size-40 title'>
									IT bozorida dasturchilarga <br /> talab !
								</h2>
								<div className='stats'>
									<div className='stat-box'>
										<h3 className='font-size-40'>+10 kompaniyalarga</h3>
										<p className='font-size-24'>
											O‘zbekiston bozorida dasturchilar kerak
										</p>
									</div>
									<div className='stat-box'>
										<h3 className='font-size-40'>6 500 000 so‘m</h3>
										<p className='font-size-24'>
											O‘rtacha oylik ish haqi to‘lanadi.
										</p>
									</div>
								</div>
								<div className='links'>
									<div className='link-box'>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/7/79/HeadHunter_logo.png'
											alt='hh.uz'
										/>
										<p className='font-size-32'>hh.uz web sayti ma'lumotlari</p>
									</div>
									<div className='link-box'>
										<img src={olx} alt='olx.uz' />
										<p className='font-size-32'>
											olx.uz web sayti ma'lumotlari
										</p>
									</div>
									<div className='link-box'>
										<img src={rabota} alt='rabota.uz' />
										<p className='font-size-32'>
											rabota.uz web sayti ma'lumotlari
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='background_m_g'>
						<div className='max-width'>
							<div className="t-center">

							<h1>
								Darajaga qarab oylik <br /> statistikasi
							</h1>
							</div>
							<div className='statistica_bar'>
								{['Dunyo', "O'zbekiston"].map((region, idx) => (
									<div
										key={idx}
										className={region === 'Dunyo' ? 'global' : 'uzb'}
									>
										<h2 className='font-size-32'>
											{region} <br /> miqyosida (oyiga)
										</h2>
										<div className='bridge'>
											{['Senior', 'Middle', 'Junior'].map((level, i) => {
												let salary = '-'

												const getSalary = value => {
													if (!value || isNaN(value)) return '-'
													return parseInt(value).toLocaleString() + ' so`m'
												}

												if (region === "O'zbekiston") {
													salary =
														level === 'Senior'
															? getSalary(courseById?.uzb_senior_salary)
															: level === 'Middle'
															? getSalary(courseById?.uzb_middle_salary)
															: getSalary(courseById?.uzb_junior_salary)
												} else {
													salary =
														level === 'Senior'
															? getSalary(courseById?.global_senior_salary)
															: level === 'Middle'
															? getSalary(courseById?.global_middle_salary)
															: getSalary(courseById?.global_junior_salary)
												}

												return (
													<div key={i} className='sort_cont'>
														<div className={level.toLowerCase()}>
															<p className='font-size-20'>{level}</p>
														</div>
														<div
															className={`bridge_box_1 ${
																level === 'Middle'
																	? 'bridge_box_2'
																	: level === 'Senior'
																	? 'bridge_box_3'
																	: ''
															}`}
														>
															<div>
																<h3 className='font-size-20'>{salary}</h3>
																<p className='font-size-18-500'>
																	{level === 'Senior'
																		? 'Eng yuqori maosh'
																		: level === 'Middle'
																		? 'O‘rtacha maosh'
																		: 'Eng past maosh'}
																</p>
															</div>
														</div>
													</div>
												)
											})}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Modal */}
					<Modal
						open={isModalOpen}
						onCancel={() => setIsModalOpen(false)}
						footer={null}
						centered
					>
						<form className='hero_from' onSubmit={handleSubmit}>
							<h2>Bepul konsultatsiya</h2>
							<p className='font-size-18-500'>
								Aloqa ma'lumotlaringizni qoldiring, va mutaxassisimiz siz bilan
								bog'lanadi.
							</p>
							<input
								className={`font-size-16 ${
									name.trim() === '' ? 'input-error' : ''
								}`}
								type='text'
								placeholder='Ismingiz'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<br />
							<input
								className={`font-size-16 ${
									phoneError
										? 'input-error'
										: phone.length === 13
										? 'bor-green'
										: phone.length > 0
										? 'bor-red'
										: ''
								}`}
								type='text'
								placeholder='(+998901234567)'
								value={phone}
								onChange={e => setPhone(e.target.value)}
							/>
							<br />
							<br />
							<button type='submit' className='font-size-18-500'>
								Ro‘yxatdan o‘tish
							</button>
						</form>
					</Modal>
				</>
			)}
		</div>
	)
}

export default ProgrammingCourse
