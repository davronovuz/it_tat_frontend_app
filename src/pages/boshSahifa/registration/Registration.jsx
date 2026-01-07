import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import * as Yup from 'yup'

import useFatch from '../../../components/useFatch'
import usePost from '../../../components/usePost'

import 'react-toastify/dist/ReactToastify.css'
import telegram from '../../../assets/telegram.kurs.png'
import './Registration.css'

const Registration = () => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [course, setCourse] = useState(null)

	const [nameError, setNameError] = useState(false)
	const [phoneError, setPhoneError] = useState(false)

	const { data: courses } = useFatch('apicourses')
	const postUser = usePost('apiregistrations/')
	const [courseOptions, setCourseOptions] = useState([])
	// 🔁 Kurslarni Select formatiga tayyorlash
	useEffect(() => {
		if (courses && Array.isArray(courses)) {
			const options = courses.map(course => ({
				label: course.title,
				value: course.id,
			}))
			setCourseOptions(options)
		}
	}, [courses])

	// ✅ Validatsiya sxemasi
	const phoneSchema = Yup.string()
		.matches(/^\+998\d{9}$/, 'Telefon raqamini +998 bilan to‘g‘ri kiriting')
		.required('Telefon raqami majburiy')

	// ✅ Formani yuborish
	const handleSubmit = async e => {
		e.preventDefault()

		let hasError = false

		if (name.trim() === '') {
			setNameError(true)
			hasError = true
		} else {
			setNameError(false)
		}

		const formattedPhone = phone.startsWith('+998')
			? phone
			: `+998${phone.replace(/\D/g, '')}`

		try {
			await phoneSchema.validate(formattedPhone)
			setPhoneError(false)
		} catch (err) {
			setPhoneError(true)
			toast.error(err.message)
			return
		}

		if (hasError) return

		const formData = {
			name,
			phone_number: formattedPhone,
		}

		const toastId = toast.loading('Yuborilmoqda...')

		postUser.mutate(formData, {
			onSuccess: () => {
				toast.update(toastId, {
					render: 'Muvaffaqiyatli ro‘yxatdan o‘tildi!',
					type: 'success',
					isLoading: false,
					autoClose: 3000,
				})
				setName('')
				setPhone('')
			},
			onError: error => {
				toast.update(toastId, {
					render:
						error?.response?.data?.message ||
						'Tarmoqda xatolik yuz berdi, qayta urinib ko‘ring.',
					type: 'error',
					isLoading: false,
					autoClose: 4000,
				})
			},
		})
	}

	return (
		<div className='background_blue'>
			<ToastContainer position='top-right' autoClose={3000} />

			<div className='max-width'>
				<div className='royxatdan_otish'>
					<h1 className='font-size-40'>
						Kurslarga ro'yxatdan o'tib, <br /> kelajagingizni boshlang!
					</h1>

					<div className='display'>
						{/* Chap tarafdagi rasm va taglar */}
						<div>
							<img src={telegram} alt='Telegram logo' />
							<div className='grids'>
								{[
									'#Robotexnika',
									'#Foundation',
									'#Frontend',
									'#Komputer savotxonligi',
									'#Grafik dizayn',
									'#SMM',
								].map((tag, idx) => (
									<button key={idx} className='font-size-16'>
										{tag}
									</button>
								))}
							</div>
						</div>

						{/* Form qismi */}
						<div>
							<form className='hero_from' onSubmit={handleSubmit}>
								<h2>Bepul konsultatsiya</h2>
								<p className='font-size-18-500'>
									Aloqa ma'lumotlaringizni qoldiring, va mutaxassisimiz siz
									bilan bog'lanadi.
								</p>
								<br />

								<input
									type='text'
									placeholder='Sizning ismingiz'
									value={name}
									onChange={e => setName(e.target.value)}
									className={`font-size-16 ${nameError ? 'input-error' : ''}`}
								/>
								<br />

								<input
									type='text'
									placeholder='(+998901234567)'
									value={phone}
									onChange={e => setPhone(e.target.value)}
									className={`font-size-16 ${
										phoneError
											? 'input-error'
											: phone.length === 13
											? 'bor-green'
											: phone.length > 0
											? 'bor-red'
											: ''
									}`}
								/>
								<br />

								<br />
								<br />
								<button type='submit' className='font-size-18-500'>
									Ro‘yxatdan o‘tish
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Registration
