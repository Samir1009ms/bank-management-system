import { useEffect, useState } from "react";
import { AuthService } from "../../services/auth.services";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Link, useNavigate } from "react-router-dom";
import style from "./design/style.module.scss"
import { useTranslation } from "react-i18next";

export function Register() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        setMessage('');
        setLoading(true)
        AuthService.register(name, email, password)
            .then((data) => {
                console.log(data);
                setLoading(false)
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }

    const handlePassword = () => {
        console.log("s");
        if (password !== confirmPassword) {
            setMessage('Passwords are not the same');
        } else {
            setMessage('');
        }
    }

    // ! input value button disablet ? true false
    useEffect(() => {
        if (email !== '' && password !== '' && name !== '' && checked) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [email, password, name, checked])

    //! dark light mod
    const { i18n } = useTranslation();
    const { t } = useTranslation()
    const [lang, setLang] = useState()

    useEffect(() => {
        let theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.body.classList.add("dark");
            // setTheme("dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light")
            // setTheme("light");
        }
        const selectedLanguage = localStorage.getItem('lang');
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
            setLang(selectedLanguage)
        } else {
            localStorage.setItem("lang", "az")
            setLang('az')
            i18n.changeLanguage(lang);

        }
    }, [])

    async function isLogged() {
        try {
            await AuthService.getCurrentUser()
            navigate("/")
        } catch {
        }
    }

    useEffect(() => {
        isLogged()

    }, [])

    return (
        <main className={`${style.main} formgrid grid justify-content-center xl:col-8 col-12 md:col-10 sm:col-12`}>
            <section className={`${style.register} field xl:col-6 sm:col-9 col-12 justify-content-center flex flex-column  align-items-center gap-4 pt-6 pb-6`}>
                <form className='col-10 sm:col-10 gap-4 grid flex-column' onSubmit={handleRegister}>
                    <h3 className={style.sign}>{t('register')}</h3>
                    <div className="card flex justify-content-center">
                        <span className="p-float-label col-12">
                            <InputText style={{ width: "100%" }} id="email" value={name} onChange={(e) => setName(e.target.value)} />
                            <label className={style.auth} htmlFor="email">{t('userName')}</label>
                        </span>
                    </div>
                    <div className="card flex justify-content-center">
                        <span className="p-float-label col-12">
                            <InputText style={{ width: "100%" }} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className={style.auth} htmlFor="email">{t('email')}</label>
                        </span>
                    </div>
                    <div className="card flex justify-content-center">
                        <span className="p-float-label col-12" style={{ padding: 0 }}>
                            <Password style={{ width: "100%" }} className='col-12' inputStyle={{ width: "100%" }} inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />
                            <label className={style.auth} htmlFor="password">{t('password')}</label>
                        </span>
                    </div>
                    <div className="card flex justify-content-center">
                        <span className={`p-float-label col-12 ${style.cPassword}`} style={{ padding: 0 }}>
                            <Password onKeyUp={() => handlePassword()} style={{ width: "100%" }} className='col-12' inputStyle={{ width: "100%" }} inputId="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} toggleMask feedback={false} />
                            <label className={style.auth} htmlFor="password">{t('cPassword')}</label>
                            {message && <small className={style.error}>{message}</small>}
                            {/* {message && <div>{message}</div>} */}
                        </span>
                    </div>
                    <div className="card flex justify-content-center col-12">
                        <div className="card flex gap-1 col-6 p-0" >
                            <Checkbox className={style.checkbox} onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                            <label htmlFor="remember" className={style.remember}>{t('remember')}</label>
                        </div>
                        <div className='card flex justify-content-center col-6 p-0'>
                            {/* <a href="/forgotpassword" className={style.link}>Forgot Password?</a> */}
                        </div>
                    </div>
                    <div className="card flex flex-wrap justify-content-center gap-3">
                        <Button disabled={disabled} className={`col-12 pb-2 pt-2 ${style.colors}`} label={loading ? "loading.." : `${t('register')}`} rounded />
                    </div>
                </form>
                <div className={`${style.xx} grid gap-2`}>
                    <span className={style.account}>{t('DoAccount?')}</span>
                    <Link to="/login" className={style.link}>{t('loginAccount')}</Link>
                </div>
            </section>
            <section className={`hidden field xl:col-6 sm:hidden md:hidden lg:flex  lg:relative sm:absolute grid align-items-center justify-content-center ${style.images}`} >
                <div className={`grid align-items-center justify-content-center ${style.text}`}>
                    <h3>{t('welcome')}</h3>
                    <p>Lorem ipsuing elit. Molomos totam est voluptatum i omos totam est voluptatum i ure sit consectetur ill</p>
                </div>
            </section>
        </main>
    )

}