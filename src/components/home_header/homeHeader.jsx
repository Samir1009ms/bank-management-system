import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import style from "./design/style.module.scss"
import { useEffect } from 'react';
import { AuthService } from '../../services/auth.services';
import { useLocation, useNavigate } from 'react-router-dom';
import { Notification } from '../notificatons/notifications';
import { useTranslation } from 'react-i18next';
import { AiOutlineDown } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'
import { FiLogOut } from 'react-icons/fi'
export function HomeHeader() {

    // ! location text
    const [pathname, setPathname] = useState(null)
    const [user, setUser] = useState()
    const location = useLocation()
    const { t } = useTranslation()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
        console.log(user);
        if (location.pathname === "/") {
            setPathname(t('dashboard'))
        } else {
            setPathname(t(`${location.pathname.slice(1)}`))
            console.log(location.pathname);
        }
    }, [location, t])

    //! user profile  
    const [users, setUsers] = useState("hidden")
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
    return (
        <div className={`${style.homeHeader}`}>
            <div className={style.title}>
                <h1>{pathname}</h1>
            </div>
            <div className={`grid align-items-center gap-3 h-full pt-2 relative `}>
                <Notification />
                <div onClick={() => userProfile()} className={`${style.profile} relative`}>
                    <Avatar className={`border-circle ${style.pAvatar}`} label='S' size="" shape="circle" />
                    {user && user.name}
                    <i className={`pi pi-angle-down ${style.icons}`}> </i>
                </div>
                <div className={`${style.profilesMenu} ${users}  flex-column gap-2 p-3`}>
                    <span className={`${style.icons} ${style.users} flex align-items-center gap-1`} >
                        <i className={`pi pi-user ${style.icons} `}>

                        </i>
                        {t('profile')}
                    </span>
                    <span className={`${style.icons} ${style.users}  flex align-items-center gap-1`} onClick={() => logout()}>
                        <i className={`pi pi-sign-out ${style.icons}`}>

                        </i>
                        {t('logout')}
                    </span>
                </div>
            </div>
        </div>
    )
}