import { useLocation, useNavigate } from 'react-router-dom'
import { mod, routing } from './config/routing.js'
import s from './design/style.module.scss'
import { useEffect, useState } from 'react'
import { Theme } from '../../components/theme/theme.jsx'
import { AuthService } from '../../services/auth.services.js'


var counter = 0

export function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [hover, setHover] = useState(null)
    const [hover2, setHover2] = useState(null)

    function active(e) {
        setHover(e)
        // setHover2(e)
        // console.log(e);
    }
    function deActive(e) {
        setHover(null)
        // setHover2(null)
    }
    function active2(e) {
        // setHover(e)
        setHover2(e)
        // console.log(e);
    }
    function deActive2(e) {
        // setHover(null)
        setHover2(null)
    }
    // function Hover(e) {
    //     return hover === e ? "#c4d7f0" : ''
    // }

    // function logout() {
    //     AuthService.logout()
    //     navigate('/login')
    //     window.location.reload();
    // }
    // const [user, setUser] = useState(null)

    // function userId() {
    // const id = AuthService.headers().then(
    //     (data) => {
    //         console.log(data);
    //     }
    // )
    // const id = localStorage.getItem("userId")
    // console.log(id);
    // setUser(id)

    const [isAdmin, setIsAdmin] = useState(false)

    async function get() {

        try {
            const data = await AuthService.headers()
            // console.log(data);
            setIsAdmin(data.isAdmin)
        }
        catch { }
    }

    useEffect(() => {
        // userId();
        get()
    }, [])

    const [ss, setS] = useState("flex")
    function show() {
        if (counter === 1) {
            setS("block")
            counter--
        } else {
            setS("hidden")
            counter++
        }
        // console.log(ss);
    }

    return (
        <header className={`${s.header} col-2 sm:${ss} hidden md:hidden lg:${ss} `}>
            <button onClick={() => show()}></button>
            <Theme></Theme>
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
                {/* {isAdmin && <p>sss</p>} */}
                <ul className={s.navList}>
                    {
                        mod.map((e, index) => {
                            return (
                                <li key={index}
                                    className={`${s.navListText}  ${hover2 === index && s.hover}`}
                                >
                                    <a
                                        className={`${s.navLink} `}
                                        onMouseEnter={() => active2(index)}
                                        onMouseLeave={() => deActive2(index)}
                                    >
                                        {e.icon}
                                        {e.text}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>

    )
}