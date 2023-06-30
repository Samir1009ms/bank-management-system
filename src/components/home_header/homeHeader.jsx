import React, { useRef, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import style from "./design/style.module.scss"
import { useEffect } from 'react';
import { AuthService } from '../../services/auth.services';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Notification } from '../notificatons/notifications';
import { useTranslation } from 'react-i18next';

export function HomeHeader() {
    // ! location text
    const [pathname, setPathname] = useState(null)
    const [user, setUser] = useState()
    const { id } = useParams()
    const location = useLocation()
    const { t } = useTranslation()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
        if (location.pathname === "/") {
            setPathname(t('dashboard'))
        } else if (location.pathname === `/card/details/${id}`) {
            setPathname(t(`${location.pathname.slice(6, 13)}`))
        } else {
            setPathname(t(`${location.pathname.slice(1)}`))
        }
    }, [location, t, id])

    //! user profile  
    const [users, setUsers] = useState("hidden")
    const userProfileRef = useRef(null);
    function userProfile() {
        if (users === "flex") {
            setUsers("hidden")
        } else {
            setUsers("flex")
        }
    }
    // ! logout
    const navigate = useNavigate()
    function logout() {
        AuthService.logout()
        navigate('/login')
    }

    const [img, setImg] = useState('');
    const filee = (dataURL) => {
        const blob = dataURLtoBlob(dataURL);
        setImg(URL.createObjectURL(blob))
        console.log(URL.createObjectURL(blob));
    }

    const dataURLtoBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    useEffect(() => {
        const img = localStorage.getItem('img')
        if (img) {
            filee(img)
        }

        const handleClickOutside = (event) => {
            if (userProfileRef.current && !userProfileRef.current.contains(event.target)) {
                setUsers("hidden");
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [])

    return (
        <div className={`${style.homeHeader}`}>
            <div className={style.title}>
                <h1 style={{ textTransform: "capitalize" }}>{pathname}</h1>
            </div>
            <div className={`grid align-items-center gap-4 h-full pt-2 relative `}>
                <Notification />
                <div onClick={() => userProfile()} ref={userProfileRef} className={`${style.profile} relative`}>
                    {/* user.img && */}
                    <Avatar className={`border-circle ${style.pAvatar}`} image={img} label={user && user.name[0]} size="" shape="circle" />
                    {user && user.name}
                    <i className={`pi pi-angle-down ${style.icons}`}> </i>
                </div>
                <div className={`${style.profilesMenu} ${users}  flex-column gap-2 p-3`}>
                    <span onClick={() => { navigate('/profile'); userProfile() }} className={`${style.icons} ${style.users} flex align-items-center gap-1`} >
                        <i className={`pi pi-user ${style.icons} `}> </i>
                        {t('profile')}
                    </span>
                    <span className={`${style.icons} ${style.users}  flex align-items-center gap-1`} onClick={() => logout()}>
                        <i className={`pi pi-sign-out ${style.icons}`}></i>
                        {t('logout')}
                    </span>
                </div>
            </div>
        </div>
    )
}