import React, { useEffect, useState } from 'react';


import img_1 from '../../assets/frontend.png'; // ? images
import img_2 from '../../assets/robo.png'; // ? images

// ? images


import './OnlineCourses.css';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';

const OnlineCourses = () => {
    let Navigate = useNavigate();

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Online darslar";

        let timer = setTimeout(()=> setLoading(false), 1000);
        window.scrollTo(0, 0); 
        return()=>clearTimeout(timer)
      }, []);

    return (
        <div className="pages_big_div">

            {loading ? (
                <Loading />

            ) : (

            <div>
            <div className="max-width">

                <div className="online-courses">

            <img className='online_courses_im_1' src={img_1} alt="" />
            <br /><br /><br /><br />
            <h1 className=' online_courses_title font-size-48'>Online darslar yaqin <br /> kunlarda yo`lga qo`yiladi</h1>
            <img className='online_courses_im_2' src={img_2} alt="" />
            </div>
            
                </div>
                <a  href="/" className="back_button">
               <button className='online_button' >Bosh sahifaga qaytish</button>
            </a>
            </div>

            )}
        </div>
    );
};

export default OnlineCourses;