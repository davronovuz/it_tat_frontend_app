import { Button as MuiButton } from '@mui/material'; // MUI Button
import { useState } from 'react'
import logo_header from '../../../assets/hed_logo.svg'

import '../../../App.css'
import './Header.css'

import { NavLink, useNavigate } from 'react-router-dom'
// ? modal
import { Modal } from 'antd'

const Header = () => {
	const navigate = useNavigate()

	// ? Modal holatini boshqarish
	const [isModalOpen, setIsModalOpen] = useState(false)

	// ? modal menu open
	const [isActive, setIsActive] = useState(false)

	const handleClick = () => {
		setIsActive(!isActive) // Click bo'lganda holat o'zgaradi.
	}

	// **Orqa fon (overlay) bosilganda menyuni yopish funksiyasi**
	const closeMenu = () => {
		setIsActive(false)
	}

	return (
		<>
			<header>
				<div className='p-4 hed_max'>
					<img onClick={() => navigate('/')} src={logo_header} alt='header-logo' />

					<ul>
						<li>
							<NavLink
								to='/'
								className={({ isActive }) =>
									isActive ? 'nav-link active-link' : 'nav-link'
								}
							>
								Bosh sahifa
							</NavLink>
						</li>
						<li>
							<NavLink to='/kurslar'>Kurslar</NavLink>
						</li>
						<li>
							<NavLink to='/ustozlar'>Ustozlar</NavLink>
						</li>
						<li>
							<NavLink to='/online-kurslar'>Online kurslar</NavLink>
						</li>
					</ul>

					{/* **Overlay qo‘shildi** */}
					{isActive && <div className='overlay' onClick={closeMenu}></div>}

					<i
						className={`bx bx-menu header_menu font-size-24-600 my ${
							isActive ? 'active' : ''
						}`}
						onClick={handleClick}
					>
						<div className='max-w'>
							<ul className='res_menu_ul'>
								<li>
									<NavLink
										to='/'
										style={({ isActive }) => ({
											color: isActive ? 'white' : 'white',
										})}
									>
										Bosh sahifa
									</NavLink>
								</li>
								<br />
								<li>
									<NavLink to='/kurslar'>Kurslar va narxlar</NavLink>
								</li>
								<br />
								<li>
									<NavLink to='/ustozlar'>Ustozlar</NavLink>
								</li>
								<br />
								<li>
									<NavLink to='/online-kurslar'>Online kurslar</NavLink>
								</li>
								<br />
								<button className='button' onClick={() => setIsModalOpen(true)}>
									Ro`yxatdan o`tish
								</button>
								<p className='items-center'>
									<i className='bx bx-phone'></i>
									<a className='font-size-16-600' href='tel:++998886110440'>
										+998 (88) 611-04-40
									</a>
								</p>
							</ul>
						</div>
					</i>

					<div className='header_but_cont'>
						<div className='flex items-center'>
							<i className='bx bx-phone'></i>
							<a className='font-size-16' href='tel:++998886110440'>
								+998 (88) 611-04-40
							</a>
						</div>

						<MuiButton className='button' onClick={() => setIsModalOpen(true)}>
							Ro`yxatdan o`tish
						</MuiButton>
					</div>
				</div>

				{/* Modal komponenti */}

				<div className='p-4'></div>
			</header>

			<Modal
				className='m'
				title=' '
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
				getContainer={false}
				modalRender={modal => (
					<div style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
						{modal}
					</div>
				)}
			>
				<div className='cont_a_i'>
					<div className='icon_top'>
						<p className='red'></p>
						<p className='yellow'></p>
						<p className='aqua'></p>
					</div>
					<i className='bx bx-cog'></i>
				</div>
				<h1 className='r'>Ro‘yxatdan o‘tish tez orada ishga tushiriladi.</h1>
			</Modal>
		</>
	)
}

export default Header
