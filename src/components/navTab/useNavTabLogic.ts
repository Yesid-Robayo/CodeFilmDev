import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { languageReducer } from "../../redux/reducers/utilsReducer";
import { authReducer } from "../../redux/reducers/authReducer";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { routes } from "../../utils/utilsTypes";

export const useNavTabLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const isAutenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const [isLogin, setIsLogin] = useState(false);
    const [isMenuOpenAccount, setIsMenuOpenAccount] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpenDrop, setIsOpenDrop] = useState(false);

    const dispatch = useDispatch();
    const menuRef: any = useRef(null);


    const changeLanguaje = (languaje: string) => {
        setIsOpenDrop(false);
        dispatch(languageReducer.actions.setLanguaje(languaje))
    };
    const changeDrop = () => {
        setIsOpenDrop(!isOpenDrop)
    }
    const changeDropAndMenu = () => {
        setIsMenuOpen(!isMenuOpen); setIsOpenDrop(false)
    }
    const changeOpenAccount = () => {
        setIsMenuOpenAccount(!isMenuOpenAccount);
        setIsOpenDrop(false)
    }
    const navigateAll = (path: routes) => {
        navigate(path);
        setIsMenuOpenAccount(false);
        setIsMenuOpen(false);
        setIsOpenDrop(false);
    }

    const closeSesion = () => {
        navigate('/home');
        dispatch(authReducer.actions.logOut());

        setIsMenuOpenAccount(false);
    }
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

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpenAccount(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return {
        labels,
        styles,
        changeDrop,
        changeDropAndMenu,
        isAutenticated,
        isLogin,
        closeSesion,
        menuRef,
        isMenuOpenAccount,
        isMenuOpen,
        isMobile,
        navigateAll,
        changeLanguaje,
        changeOpenAccount,
        isOpenDrop
    };
};
