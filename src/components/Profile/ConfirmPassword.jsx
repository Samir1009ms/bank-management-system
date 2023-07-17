import React, { useEffect, useState } from 'react'
import style from './design/style.module.scss'
import Service from '../validation/validation'
import { useTranslation } from 'react-i18next'
import { Password } from 'primereact/password';
import axios from 'axios'

const VALIDATOR = {
    password: (value, t) => {
        return Service.min(value, 8, t) || Service.max(value, 20, t)
    },

    yPassword: (value, t) => {
        return Service.min(value, 8, t) || Service.max(value, 20, t)
    },
    nPassword: (value, t) => {
        return Service.min(value, 8, t) || Service.max(value, 20, t)
    }
}
export default function ConfirmPassword() {
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState()
    useEffect(() => {
        const selectedLanguage = localStorage.getItem('lang');
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
            setLang(selectedLanguage)
        } else {
            localStorage.setItem("lang", "az")
            setLang('az')
            i18n.changeLanguage(lang);
        }
        console.log("ss");
    }, [i18n, lang])

    const [formValues, setFormValues] = useState({
        password: '',
        yPassword: '',
        nPassword: ''
    })

    const [formError, setFormError] = useState({
        password: '' ? undefined : true,
        yPassword: '' ? undefined : true,
        nPassword: '' ? undefined : true
    })

    const handleFormValue = (e) => {
        const name = e.target.name
        let value = (e.target.value)
        if (value === "") {
            value = ""
            setFormValues({ ...formValues, [name]: value })
        }
        setFormValues({ ...formValues, [name]: value })
        validations(name, value)
    }

    const validations = (name, value) => {
        setFormError({ ...formError, [name]: VALIDATOR[name](value, t) })
    }

    const error = () => {
        for (const name in formError) {
            if (formError[name]) {
                return true;
            }
        }
        return false;
    };

    const BASE_URL = 'http://localhost:5500/api'
    const [err, setErr] = useState()

    function handlePassword() {
        const { email } = JSON.parse(localStorage.getItem('user'))
        const { password, nPassword } = formValues
        axios.post(`${BASE_URL}/login`, { email, password, nPassword }).then((e) => {
            console.log(e);
        }).catch((e) => {
            setErr(e.response.data.parol)
            console.log();
        })
    }

    return (
        <section style={{ width: '44%', padding: '20px', background: 'var(--homeR-bg-color)', borderRadius: "15px" }}>
            <div style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '900' }}>
                <span style={{ color: "var(--nav-text-color)" }}>Change Password</span>
            </div>
            <div className={style.d} style={{ color: 'var(--nav-text-color)', padding: '15px', marginTop: '10px', border: "1px solid #ff8303", borderRadius: '15px', background: 'var(--summary-bg-color)' }}>
                <div className="flex flex-column gap-2" style={{ marginBottom: "25px", position: "relative" }}>
                    <label htmlFor="password">{t('currentP')}*</label>
                    <Password
                        style={{ width: "100%" }}
                        value={formValues.password}
                        className={`${style.input} 
                    ${formValues.password
                                ? (formError.password
                                    ? style.red : style.green)
                                : style.input}`}
                        name='password'
                        inputStyle={{ width: "100%" }}
                        onChange={handleFormValue}
                        inputId="password"
                        toggleMask
                        feedback={false} />
                    <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{formError.password}</small>
                    <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{err && err}</small>
                </div>
                <div className="flex flex-column gap-2" style={{ marginBottom: "25px", position: "relative" }}>
                    <label htmlFor="yPassword">{t('nPassword')}*</label>
                    <Password
                        style={{ width: "100%" }}
                        value={formValues.yPassword}
                        className={`${style.input} 
                    ${formValues.yPassword
                                ? (formError.yPassword ? style.red : style.green)
                                : style.input}`}
                        name='yPassword'
                        inputStyle={{ width: "100%" }}
                        onChange={handleFormValue}
                        inputId="yPassword"
                        toggleMask
                        feedback={false} />
                    <small
                        style={{
                            position: "absolute",
                            bottom: "-20px",
                            color: "#ff9c4d"
                        }}
                    >{formError.yPassword}</small>
                </div>
                <div className="flex flex-column gap-2" style={{ marginBottom: "25px", position: "relative" }}>
                    <label htmlFor="nPassword">{t('cNPassword')}*</label>
                    <Password style={{ width: "100%" }}
                        className={`${style.input} 
                    ${formValues.nPassword
                                ? (formError.nPassword ? style.red : style.green)
                                : style.input}`}
                        value={formValues.nPassword}
                        name='nPassword'
                        inputStyle={{ width: "100%" }}
                        onChange={handleFormValue}
                        inputId="nPassword"
                        toggleMask
                        feedback={false} />
                    <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{formError.nPassword}</small>
                    <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{!formError.nPassword && (formValues.nPassword !== formValues.yPassword) && 'parollar beraber deyil'}</small>
                </div>
                <div className="flex flex-column gap-2" style={{ marginBottom: "10px", position: "relative" }}>
                    <button style={{ backgroundColor: "darkcyan", borderRadius: "10px", padding: '8px', width: "100%", margin: '0' }} onClick={handlePassword}>{t('saveChanges')}</button>
                </div>
            </div>
        </section>
    )
}
