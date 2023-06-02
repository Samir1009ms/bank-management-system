import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { FiLogOut } from "react-icons/fi"
import style from "./design/style.module.scss"
import { useEffect } from 'react';
import { AuthService } from '../../services/auth.services';
import { useLocation, useNavigate } from 'react-router-dom';
import { Notification } from '../notificatons/notifications';

export function HomeHeader() {

    // ! location text
    const [pathname, setPathname] = useState(null)
    const location = useLocation()

    useEffect(() => {

        if (location.pathname === "/") {
            setPathname("Dashboard")
        } else {
            setPathname(location.pathname.slice(1))
            console.log(location.pathname);
        }
    }, [location])

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
        // window.location.reload();
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
                    Samir Yusifov
                    <i className={`pi pi-angle-down ${style.icons}`}> </i>
                </div>
                <div className={`${style.profilesMenu} ${users}  flex-column gap-2 p-3`}>
                    <span className={`${style.icons} flex align-items-center gap-1`} >
                        <i className={`pi pi-user ${style.icons}`}></i>
                        Profile
                    </span>
                    <span className={`${style.icons} flex align-items-center gap-1`} onClick={() => logout()}>
                        <FiLogOut ></FiLogOut>
                        Logout
                    </span>
                </div>
            </div>
        </div>
    )
}