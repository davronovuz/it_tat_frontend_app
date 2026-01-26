import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import hero_img from '../../../assets/hero.png'
import useFatch from '../../../components/useFatch'
import usePost from '../../../components/usePost'
import './Hero.css'

const Header = () => {
	const navigate = useNavigate()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [nameError, setNameError] = useState(false)
	const [phoneError, setPhoneError] = useState(false)

	const { data: courseList } = useFatch('apicourses')
	const postUser = usePost('apiregistrations/')

	useEffect(() => {
		if (isModalOpen) {
			setName('')
			setPhone('')
			setNameError(false)
			setPhoneError(false)
		}
	}, [isModalOpen])

	const handleSubmit = async e => {
		e.preventDefault()

		let hasError = false

		// Ism validatsiyasi
		if (name.trim() === '') {
			setNameError(true)
			hasError = true
		} else {
			setNameError(false)
		}

		// Telefon raqamini formatlash
		const formattedPhone = phone.startsWith('+998')
			? phone
			: `+998${phone.replace(/\D/g, '')}`

		// Yup validatsiyasi
		const phoneSchema = Yup.object().shape({
			phone: Yup.string()
				.matches(
					/^\+998\d{9}$/,
					'Telefon raqamini +998 bilan to‘liq kiriting (masalan, +998901234567)'
				)
				.required('Telefon raqami majburiy'),
		})

		try {
			await phoneSchema.validate({ phone: formattedPhone })
			setPhoneError(false)
		} catch (validationError) {
			setPhoneError(true)
			toast.error(validationError.message)
			return
		}

		if (hasError) return

		const dataPost = {
			name,
			phone_number: formattedPhone,
		}

		const toastId = toast.loading('Yuborilmoqda...')

		postUser.mutate(dataPost, {
			onSuccess: () => {
				toast.update(toastId, {
					render: 'Muvaffaqiyatli ro‘yxatdan o‘tildi!',
					type: 'success',
					isLoading: false,
					autoClose: 3000,
				})
				setIsModalOpen(false)
			},
			onError: error => {
				toast.update(toastId, {
					render:
						error?.response?.data?.message ||
						'Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.',
					type: 'error',
					isLoading: false,
					autoClose: 4000,
				})
				setIsModalOpen(false)
			},
		})
	}

	return (
		<div className='background big_her' id='hero'>
			<div className='max-width'>
				<div className='hero'>
					<h1 className='font-size-48'>
						Innovatsiya va texnologiya olamida buyuklardan biri bo'lishga IT TAT
						sizga ko‘makdosh
					</h1>

					<div className='hero_consultation'>
						<img src={hero_img} alt='hero' />

						<div className='courses'>
							<div className="buttons-hero">

							{courseList?.map(course => (
								<button
								key={course.id}
								onClick={() => navigate(`/kurslar/kurs/${course.id}`)}
								className='font-size-18-500'
								>
									{course.title}
								</button>
							))}
							</div>
						</div>

						<div className='bepul_consultatsya'>
							<p className='font-size-24'>
								IT TAT - O'z qadriyatlariga ega va eng kuchli mutaxassislar
								<br />
								jamlangan zamonaviy kasblar o‘quv markazi.
							</p>
							<br />
							<button onClick={() => setIsModalOpen(true)}>
								Bepul konsultatsiya olish
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Modal */}
			<Modal
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
				centered
				destroyOnClose
			>
				<form className='hero_from' onSubmit={handleSubmit}>
					<h2>Bepul konsultatsiya</h2>
					<p className='font-size-18-500'>
						Aloqa ma'lumotlaringizni qoldiring, va mutaxassisimiz siz bilan
						bog'lanadi.
					</p>

					<input
						className={`font-size-16 ${nameError ? 'input-error' : ''}`}
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
						placeholder='+998901234567'
						value={phone}
						onChange={e => setPhone(e.target.value)}
					/>
					<br />

					<button type='submit' className='font-size-18-500'>
						Ro‘yxatdan o‘tish
					</button>
				</form>
			</Modal>
		</div>
	)
}

export default Header
