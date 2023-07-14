import { Link, useLocation } from 'react-router-dom'
import { mod, routing } from './config/routing.jsx'
import s from './design/style.module.scss'
import { useEffect, useState } from 'react'
import { AuthService } from '../../services/auth.services.js'
import LanguageSwitcher from '../../components/translate/TranslateSwitch.jsx'
import { useTranslation } from 'react-i18next'
import { Theme } from '../../components/theme/theme.jsx'


var counter = 0

export function Navbar() {
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

    const [isAdmin, setIsAdmin] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            const data = await AuthService.headers();
            setIsAdmin(data.isAdmin);
        };

        fetchData();
        const handleResize = () => {
            if (window.innerWidth >= 992) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isAdmin]);


    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div onClick={() => toggleMenu()} className={`lg:hidden ${s.hamburger}`}>X</div>
            <header className={`${s.header}  animate__animated col-2 lg:flex  ${isOpen ? `${s.active} ` : ''}`}>
                {/* <LanguageSwitcher /> */}
                <nav className={s.navTop}>
                    <ul className={s.navList}>
                        {routing.map((route, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`${s.navListText} ${location.pathname === route.link && s.active} ${hover === index && s.hover}`}
                                >
                                    <Link
                                        to={route.link}
                                        className={`${s.navLink} ${location.pathname === route.link && s.active}`}
                                        onMouseEnter={() => active(index)}
                                        onMouseLeave={() => deActive(index)}
                                    >
                                        {route.icon}
                                        {t(`${route.text}`)}
                                    </Link>
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
                                        <Link
                                            className={`${s.navLink} ${e.text === "" && s.links} `}
                                            onMouseEnter={() => active2(index)}
                                            onMouseLeave={() => deActive2(index)}
                                        >
                                            {e.icon}
                                            {e.text && <span>{t(`${e.text}`)}</span>}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div style={{ display: 'none' }}>
                        <Theme />
                    </div>
                </nav>
            </header>
        </>

    )
}