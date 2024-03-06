import { useLocation, useNavigate } from 'react-router-dom';
import { useLabels } from "../hooks/useLanguage";
import imageCodeFilm from "../assets/images/CodeFilmDev.png";
import { useStyles } from "../hooks/useStyles";
import { useEffect, useState } from "react";
import IonIcon from '@reacticons/ionicons';
import { useSelector } from 'react-redux';

export const NavTab = () => {
    const labels = useLabels();
    const styles = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const isAutenticated = useSelector((state: any) => state.auth.isAutenticated);
    const [isLogin, setIsLogin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();


        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        setIsLogin(location.pathname === '/login');
    }, [location.pathname]);
    return (
        <div className="sticky  top-0 w-full z-50 " style={{ height: '4.5rem', backgroundColor: styles.colors.primarybg }}>
            <div className={`  ${isLogin ? '' : 'animate-enterFromLeft'} justify-center lg:justify-start flex items-center w-full h-full `}>
                <div onClick={() => navigate('/home')} className={`cursor-pointer flex w-full  justify-start ${isLogin ? 'animate-pulse w-full justify-center' : 'lg:w-10/12'} items-center `}>
                    <img src={imageCodeFilm} alt="CodeFilm" className="h-12 ml-4" />
                    <h1 className='text-white ml-5 text-xl' style={{ fontFamily: styles.fonts.primary }}>{labels.namePage}</h1>
                </div>
                {!isLogin && <div className='flex justify-end  w-full h-full '>
                    {(isMenuOpen || !isMobile) && <div className=' w-full  lg:flex lg:h-full absolute left-0 lg:static  items-center' style={{
                        backgroundColor: styles.colors.primarybg, ...(isMobile ? { top: '4.5rem' } : {})
                    }}
                    >
                        <div className={`${isLogin ? 'animate-exitfromLeft' : 'animate-enterFromLeft'} lg:flex  w-full  justify-end lg:h-full items-center`}>
                            <button className='text-white h-full w-full lg:w-auto pt-5 lg:pt-0 lg:px-5' onClick={() => navigate('/home')}> {labels.home}</button>
                            <button className='text-white h-full  w-full lg:w-auto py-5 lg:py-0  lg:px-5' onClick={() => navigate('/categories')}> {labels.categories}</button>
                            {isAutenticated && <button className='text-white h-full   w-full lg:w-auto pb-5 lg:py-0 lg:px-5 ' onClick={() => { }}> {labels.gestVideos}</button>}
                        </div>

                    </div>}
                    <div className='flex justify-center items-center w-56 '>
                        <button
                            onClick={() => { }}
                            className={`text-center flex items-center justify-center w-32`}
                        >
                            {isAutenticated ?
                                <IonIcon name={'person'} className={`text-4xl  text-white mr-4`} />
                                :
                                <div
                                    className='text-white flex w-full rounded-full cursor-pointer mr-5 border 
                                    text-center border-gray-500 'style={{ padding: '.4rem' }}
                                    onClick={() => navigate('/login')}>
                                    <h4 className='text-center'>{labels.logIn}</h4>
                                </div>


                            }
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`${isLogin ? 'hidden' : 'flex'} ${isMobile ? 'flex' : 'hidden'}`}>
                            <IonIcon name={isMenuOpen ? 'close' : 'menu'} className={`text-4xl text-white mr-4`} />
                        </button>
                    </div>

                </div>}


            </div>


        </div >
    );
};