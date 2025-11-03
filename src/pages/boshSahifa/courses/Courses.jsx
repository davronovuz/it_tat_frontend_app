import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { WiStars } from 'react-icons/wi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' // ❗ faqat toast, container emas
import * as Yup from 'yup'
import useFatch from '../../../components/useFatch'
import usePost from '../../../components/usePost'

import './Courses.css'

const Courses = () => {
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [course, setCourse] = useState('')
	const [newData, setNewData] = useState([])
	const [phoneError, setPhoneError] = useState(false)

	const postUser = usePost('apiregistrations/')
	const { data: courseList } = useFatch('apicourses')

	useEffect(() => {
		if (courseList) {
			const options = courseList.map(item => ({
				value: item.title,
				label: item.title,
			}))
			setNewData(options)
		}
	}, [courseList])

	useEffect(() => {
		if (isModalOpen) {
			setName('')
			setPhone('')
			setPhoneError(false)
		}
	}, [isModalOpen])

	const notifySuccess = () =>
		toast.success('Muvaffaqiyatli ro‘yxatdan o‘tildi!')
	const notifyError = msg => toast.error(msg || 'Xatolik yuz berdi')

	const handleSubmit = async e => {
		e.preventDefault()

		const formattedPhone = phone.startsWith('+998')
			? phone
			: `+998${phone.replace(/\D/g, '')}`

		const phoneSchema = Yup.object().shape({
			phone: Yup.string()
				.matches(
					/^\+998\d{9}$/,
					'Telefon raqamini +998 bilan kiriting (masalan, +998901234567)'
				)
				.required('Telefon raqami majburiy'),
		})

		try {
			await phoneSchema.validate({ phone: formattedPhone })
			setPhoneError(false)

			if (name.trim() === '') {
				notifyError('Ismingizni kiriting')
				return
			}

			if (!course) {
				notifyError('Kursni tanlang')
				return
			}

			const dataPost = {
				name,
				phone_number: formattedPhone,
				course_id: course,
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
						render: error?.message || 'Tarmoqda xatolik yuz berdi',
						type: 'error',
						isLoading: false,
						autoClose: 4000,
					})
				},
			})
		} catch (err) {
			setPhoneError(true)
			notifyError(err.message)
		}
	}

	return (
		<div className='background_blue'>
			<div className='max-width'>
				<menu>
					<h2 className='font-size-40'>Bizning kurslarimiz </h2>
					<div className='menu'>
						{courseList?.map(inform => (
							<div
								onClick={() => navigate(`/kurslar/kurs/${inform.id}`)}
								className={`item${inform.id}`}
								key={inform.id}
							>
								<div className='display'>
									<p className='dasturlash_6_oy font-size-16-600 display'>
										{inform.duration_months} oy
										<strong>
											{inform.title === 'Foundation' ? (
												<span className='font-size-14'>
													amaliy talim mavjud emas
												</span>
											) : (
												<span>+1 amaliyot talimi</span>
											)}
										</strong>
									</p>
								</div>
								<div className='display_beetven'>
									<h2>{inform.title}</h2>
									<h4>
										Ai <WiStars />
									</h4>
								</div>
								<p className='p_color font-size-16'>
									{inform.description?.slice(0, 150) + '...'}
								</p>
								<div className='center'>
									<div className='course_icon'>
										<i
											onClick={event => {
												event.stopPropagation()
												setCourse(inform.id) // <-- Kurs id-ni saqlash!
												setIsModalOpen(true)
											}}
											className='bx bx-right-arrow-alt arrow_modal'
										></i>
									</div>
									<div>
										<img
											src={inform.image}
											alt={inform.title || 'Kurs rasmi'}
										/>
									</div>
								</div>
							</div>
						))}
					</div>

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
				</menu>
			</div>
		</div>
	)
}

export default Courses
