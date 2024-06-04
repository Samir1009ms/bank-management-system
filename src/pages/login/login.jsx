import React, { useEffect, useRef, useState } from 'react';
import { AuthService } from '../../services/auth.services';
import { Link, useNavigate } from 'react-router-dom';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import style from "./design/style.module.scss"
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const Login = () => {
    const [email, setEmail] = useState('samir@admins.com');
    const [password, setPassword] = useState('23012001');
    const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(true);
    const { i18n } = useTranslation();
    const { t } = useTranslation()
    const [lang, setLang] = useState()
    const toast = useRef(null);

    const showError = (e) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: `${e}`, life: 3000 });
    }

    useEffect(() => {
        let theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light")
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

    useEffect(() => {
        if (email !== '' && password !== '' && checked) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [email, password, checked]);

    const handleLogin = (event) => {
        event.preventDefault();
        setMessage('');
        setLoading(true);
        AuthService.login(email, password)

            .then((data) => {
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                showError(error.response.data.message);
                console.log(error.response.data.parol)

            });
    };

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
        <main className={`${style.main} formgrid grid justify-content-center xl:col-8 md:col-10 col-12 sm:col-12`}>
            <Toast ref={toast} />
            <section className={`${style.login} col-12 field xl:col-6 sm:col-9 justify-content-center flex flex-column  align-items-center gap-4 pt-6 pb-6`}>
                <form className='col-10 sm:col-10 gap-4 grid flex-column' onSubmit={handleLogin}>
                    <h3 className={style.sign}>{t('login')}</h3>
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
                    <div className="card flex justify-content-center col-12">
                        <div className="card flex gap-1 col-6 p-0" >
                            <Checkbox className={style.checkbox} onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                            <label htmlFor="remember" className={style.remember}>{t('remember')}</label>
                        </div>
                        <div className='card flex justify-content-center col-6 p-0'>
                            <a href="/forgotpassword" className={style.link}>{t('fPassword')}</a>
                        </div>
                    </div>
                    <div className="card flex flex-wrap justify-content-center gap-3">
                        <Button disabled={disabled} className={`col-12 pb-2 pt-2 ${style.colors}`} label={loading ? "loading.." : `${t('login')}`} rounded />
                    </div>
                    {message && <div>{message}</div>}
                </form>
                <div className={`${style.xx} grid gap-2`}>
                    <span className={style.account}>{t('dontAccount')}</span>
                    <Link to="/register" className={style.link}>{t('createAccount')}</Link>
                </div>
            </section>
            <section className={`hidden field xl:col-6  md:hidden lg:flex  lg:relative sm:absolute grid align-items-center justify-content-center ${style.images}  sm:hidden`} >
                <div className={`grid align-items-center justify-content-center ${style.text}`}>
                    <h3>{t("welcome")}</h3>
                    <p>Lorem ipsuing elit. Molomos totam est voluptatum i omos totam est voluptatum i ure sit consectetur ill</p>
                </div>
            </section>
        </main>
    );
};

export default Login;
