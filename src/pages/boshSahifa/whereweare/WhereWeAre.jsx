import mercor from '../../../assets/freelance.jpg'
import itTat from '../../../assets/logoSvg.svg'
import nap from '../../../assets/remove-nat.png'
import itPark from '../../../assets/parkIt.png'
import img_tat from '../../../assets/photo_tat.jpg'
import texnomart from '../../../assets/tex.png'
import doWork from '../../../assets/union.jpg'
import designStudio from '../../../assets/design-studio.png'


import './WhereWeAre.css'
const WhereWeAre = () => {

	const unionStyle = {
		width: '150px',
		height:'150px',
		borderRadius: '50%',
	}
	return (
		<div className='background'>
			<div className='max-width'>
				<div className='work'>
					<h1 className='font-size-40'>
						Bizning o`quvchilarimiz <br /> qayerda ishlashadi
					</h1>
					<div className='work_menu'>
						<img src={mercor} alt='' />
						<img src={itPark} alt='' />
						<img src={itTat} alt='' />
						<img src={nap} alt='' />
						<img src={doWork} alt='' style={unionStyle} />
						<img src={texnomart} alt="texnomart" />
						<img src={designStudio} alt="design-studio" />
					</div>
					<div className='biz_qayerda_joylashganmiz'>
						<h1 className='font-size-40'>Biz qayerda joylashganmiz</h1>
						<div className='display information_tat'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.762154936148!2d66.92167178277481!3d39.67756452700205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19d54b324835%3A0xdf389d78adb91db2!2sIT%20TAT!5e0!3m2!1sru!2s!4v1740060977065!5m2!1sru!2s'
								title='Google Map'
								width='600'
								height='450'
								style={{ border: '0' }}
								allowFullScreen=''
								loading='lazy'
							/>

							<div className='information'>
								<h2 className='font-size-24-600'>Samarqand</h2>
								<img src={img_tat} alt='' />
								<p className='font-size-14'>
									Samarqand viloyati Beruniy ko'chasi 32a
								</p>
								<p className='font-size-14'>
									mo`ljal <br />
									<b>Ipateka bank, chorni park ro`parasi.</b>
								</p>
								<hr />
								<p className='font-size-14'>
									ish vaqti
									<br />
									<b>08:00 - 22:00</b>
								</p>
								<hr />
								<p className='font-size-14'>
									Telefon
									<br /> <a href='tel:+998886110440'>+998 (88) 611-04-40</a>
									<br />
									<a href='tel:+998906020440'>+998 (90) 602-04-40</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WhereWeAre
