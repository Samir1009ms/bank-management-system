import { useLocation, useNavigate } from 'react-router-dom'
import { routing } from './config/routing.js'
import s from './design/style.module.css'
import { useState } from 'react'
import { Theme } from '../../components/theme/theme.jsx'
import { AuthService } from '../../services/auth.services.js'



export function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [hover, setHover] = useState(null)

    function active(e) {
        setHover(e)
        console.log(e);
    }
    function deActive(e) {
        setHover(null)
    }

    // function Hover(e) {
    //     return hover === e ? "#c4d7f0" : ''
    // }

    function logout() {
        AuthService.logout()
        navigate('/login')
        window.location.reload();
    }


    return (

        <header className={s.header}>
            <Theme></Theme>
            <button onClick={() => logout()}></button>
            <nav className={s.navTop}>
                <ul className={s.navList}>
                    {routing.map((route, index) => {
                        return (
                            <li
                                key={index}
                                // onClick={() => navigate(route.link)}
                                className={`${s.navListText} ${location.pathname === route.link && s.active} ${hover === index && s.hover}`}
                            >
                                <a
                                    href={route.lin}
                                    onClick={() => navigate(route.link)}
                                    className={`${s.navLink} ${location.pathname === route.link && s.active}`}
                                    onMouseEnter={() => active(index)}
                                    onMouseLeave={() => deActive(index)}
                                >
                                    {route.icon}
                                    {route.text}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>

    )
}