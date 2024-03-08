import imageCodeFilm from "../../assets/images/CodeFilmDev.png";
import IonIcon from '@reacticons/ionicons';
import { useNavTabLogic } from "./useNavTabLogic";

export const NavTab = () => {
    const {
        labels,
        styles,
        isAutenticated,
        isLogin,
        isMobile,
        isMenuOpen,
        menuRef,
        isMenuOpenAccount,
        changeLanguaje,
        isOpenDrop,
        changeDrop,
        changeOpenAccount,
        closeSesion,
        changeDropAndMenu,
        navigateAll,
    } = useNavTabLogic();
    return (
        <div className={`sticky top-0 w-full z-50`} style={{ height: '4.5rem', backgroundColor: styles.colors['blue-500'] }}>
            <div className={`${isLogin ? '' : 'animate-enterFromLeft'} justify-center lg:justify-start flex items-center w-full h-full`}>
                <div onClick={() => {
                    navigateAll('/home');
                }}
                    className={`cursor-pointer flex w-full justify-start ${isLogin ? 'w-full justify-center' : 'lg:w-3/5 lg:mr-20'} items-center`}>
                    <img src={imageCodeFilm} alt="CodeFilm" className="h-12 ml-4" />
                    <h1 className='text-white ml-5 text-xl' style={{ fontFamily: styles.fonts.primary }}>{labels.namePage}</h1>
                </div>
                {!isLogin &&
                    <div className='flex justify-end w-full h-full'>
                        {(isMenuOpen || !isMobile) &&
                            <div className='w-full lg:flex lg:h-full absolute left-0 lg:static items-center' style={{ backgroundColor: styles.colors['blue-500'], ...(isMobile ? { top: '4.5rem' } : {}) }}>
                                <div className={`${isLogin ? 'animate-exitfromLeft' : 'animate-enterFromLeft'} lg:flex w-full justify-end lg:h-full items-center`}>
                                    <button className='text-white h-full w-full lg:w-auto pt-5 lg:pt-0 lg:px-5' style={{ fontFamily: styles.fonts.text }} onClick={() => navigateAll('/home')}> {labels.home}</button>
                                    <button className='text-white h-full w-full lg:w-auto py-5 lg:py-0 lg:px-5' style={{ fontFamily: styles.fonts.text }} onClick={() => navigateAll('/categories')}> {labels.categories}</button>
                                    <button className='text-white h-full w-full lg:w-auto  lg:py-0 lg:px-5' style={{ fontFamily: styles.fonts.text }} onClick={() => navigateAll('/allVideos')}> {labels.allVideos}</button>
                                    {isAutenticated && <button className='text-white h-full w-full lg:w-auto py-5 lg:py-0 lg:px-5' style={{ fontFamily: styles.fonts.text }} onClick={() => navigateAll('/myVideos')}> {labels.myVideos}</button>}
                                    {isAutenticated &&
                                        <button className='text-white h-full w-full lg:w-auto pb-5 lg:py-0 lg:px-5' style={{ fontFamily: styles.fonts.text }} onClick={() => navigateAll('/manageVideos')}> {labels.gestVideos}</button>
                                    }
                                    <button
                                        onClick={() => changeDrop()}
                                        className='text-white h-full w-full lg:w-auto items-center justify-center text-center pb-5 lg:py-0 lg:px-5 flex' style={{ fontFamily: styles.fonts.text }}>
                                        {labels.languaje}
                                        <IonIcon name={'chevron-down'} className={`text-xl text-center text-white ml-2 self-center`} />
                                    </button>

                                    {isOpenDrop && (
                                        <div className="inset-0 flex items-center justify-center">
                                            <div className="absolute top-44 lg:top-16 lg:right-4 w-36  text-center rounded-md shadow-lg 
                                            border-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" >
                                                <div className="py-1 text-center" >
                                                    <button className="block w-full px-4 py-2 text-sm 
                                                    text-center text-gray-700 hover:bg-gray-100 
                                                    hover:text-gray-900"style={{ fontFamily: styles.fonts.text }}
                                                        onClick={() => changeLanguaje('es')}                                                >{labels.languajeEsp}</button>
                                                    <button className="block w-full  px-4 py-2 text-sm   text-center text-gray-700 hover:bg-gray-100 
                                                    hover:text-gray-900" style={{ fontFamily: styles.fonts.text }}
                                                        onClick={() => changeLanguaje('en')}  >{labels.languajeEng}</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}



                                </div>
                            </div>
                        }
                        <div className='flex justify-center items-center w-56' ref={menuRef}>
                            <button className={`text-center flex items-center justify-center w-32`} >
                                {isAutenticated ?
                                    <IonIcon name={'person'} onClick={() => {
                                        changeOpenAccount()
                                    }} className={`text-3xl text-white`} />
                                    :
                                    <div className='text-white flex w-full rounded-full cursor-pointer mr-5 border text-center text-sm border-white' style={{ padding: '.4rem', paddingLeft: '.6rem', fontFamily: styles.fonts.text }} onClick={() => { navigateAll('/login') }}>
                                        <h4 className='text-center'>{labels.logIn}</h4>
                                    </div>
                                }
                            </button>
                            {isMenuOpenAccount && (
                                <div className="absolute lg:right-16 right-28 mt-28 w-48 bg-white border-2 rounded-lg shadow-lg z-10">
                                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={() => navigateAll('/account')}>
                                        {labels.miAccount}
                                    </button>
                                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left" onClick={() => { closeSesion() }}>
                                        {labels.logOut}
                                    </button>
                                </div>
                            )}
                            <button onClick={() => { changeDropAndMenu() }} className={`${isLogin ? 'hidden' : 'flex'} ${isMobile ? 'flex' : 'hidden'}`}>
                                <IonIcon name={isMenuOpen ? 'close' : 'menu'} className={`text-4xl text-white mr-4`} />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div >
    );
};
