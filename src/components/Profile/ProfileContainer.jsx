import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import LanguageSwitcher from '../translate/TranslateSwitch';
import { Theme } from '../theme/theme';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import style from './design/style.module.scss'
import { tr } from 'date-fns/locale';
// import audi from '../../assets/water_droplet.mp3'
export default function ProfileContainer({ data }) {
    const { t } = useTranslation()
    const { i18n } = useTranslation();
    const [sound, setSound] = useState(false)
    const [notification, setNotification] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const selectedLanguage = localStorage.getItem('lang');
        const sounds = localStorage.getItem("sound")
        if (sounds === "true") {
            setSound(true)
            // const audio = new Audio(audi);
            // audio.play();
        }
        else {
            setSound(false)
        }
        if (localStorage.getItem("notification") === "true") {
            setNotification(true)
        }
        else {
            setNotification(false)
        }
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        } else {
            localStorage.setItem("lang", "az")
            i18n.changeLanguage("az");
        }
    }, [])

    function handleClickSound() {
        if (sound) {
            localStorage.setItem("sound", false)
            setSound(false)
            // const audio = new Audio(audi);
            // audio.play();
        }
        else {
            localStorage.setItem("sound", true)
            setSound(true)
        }
    }
    function handleClickNotification() {
        if (notification) {
            localStorage.setItem("notification", false)
            setNotification(false)
        }
        else {
            localStorage.setItem("notification", true)
            setNotification(true)
        }
    }

    return (
        <section className={style.profile} >
            <div className={style.container} >
                {data.map((e) => (
                    <div className={style.cont} key={e.text} >
                        <span className={style.text}>
                            <span className={style.icon} >{e.icon}</span>
                            {t(`${e.text}`)}
                        </span>
                        {e.status &&
                            <div className={style.group}>
                                {
                                    (
                                        e.button && (e.text === "Sound")
                                            ? <button className={style.toggleBtn} onClick={() => handleClickSound()}>{sound ? 'on' : 'off'}</button>
                                            : (e.text === "Theme")
                                                ? <Theme />
                                                : (e.text === 'Edit profile information')
                                                    ? <button className={style.editBtn} onClick={() => navigate("/settings/editprofile")}>edit</button>
                                                    : <button className={style.toggleBtn} onClick={() => handleClickNotification()}>{notification ? 'on' : 'off'}</button>
                                    )
                                }
                            </div>}
                    </div>
                ))}
            </div>
        </section>
    )
}


ProfileContainer.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        icon: PropTypes.object,
        status: PropTypes.bool,
        button: PropTypes.bool
    }))
}
