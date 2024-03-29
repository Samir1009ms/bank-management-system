import React, { useEffect, useState } from 'react'
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import style from './design/style.module.scss'
import Service from '../validation/validation';
import { useTranslation } from 'react-i18next';
import { ApiService } from '../../services/api.services';

const VALIDATOR = {
    userName: (value, t) => {
        return Service.min(value, 8, t) || Service.max(value, 18, t)
    },
    email: (value, t) => {
        const minLengthError = Service.min(value, 0, t);
        const maxLengthError = Service.max(value, 50, t);
        const isValidEmailError = isValidEmail(value) ? null : t("emailValidation");
        return minLengthError || maxLengthError || isValidEmailError;
    },
    date: (value, t) => {
        return Service.min(value, 9, t) || Service.max(value, 12, t)
    },
    province: (value, t) => {
        return Service.min(value, 3, t) || Service.max(value, 15, t)
    },
    phone: (value, t) => {
        return Service.min(value, 12, t) || Service.max(value, 18, t)
    },
    city: (value, t) => {
        return Service.min(value, 3, t) || Service.max(value, 30, t)
    },
    adress: (value, t) => {
        return Service.min(value, 3, t) || Service.max(value, 40, t)
    }
}

const isValidEmail = (email) => {
    const emailRegex = /^([\w\-]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+.)+)([a-zA-Z]{2,4})(\.az|\.tr|\.com))$/;
    return emailRegex.test(email);
};

export default function EditProfileCont() {
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
    }, [i18n, lang])

    const [formValues, setFormValues] = useState({
        userName: '',
        email: '',
        date: Date,
        phone: '',
        province: '',
        city: '',
        adress: ''
    })

    const [formError, setFormError] = useState({
        userName: String ? undefined : true,
        email: String ? undefined : true,
        date: Date ? undefined : true,
        phone: String ? undefined : true,
        province: String ? undefined : true,
        city: String ? undefined : true,
        adress: String ? undefined : true
    })

    const handleFormValue = (e) => {
        const name = e.target.name
        let value = (e.target.value)
        if (name !== "date") {
            value = value.trimStart()
        }
        if (value === "") {
            value = " "
            setFormValues({ ...formValues, [name]: value })
        }
        setFormValues({ ...formValues, [name]: value })
        console.log(typeof (value));
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

    const [status, setStatus] = useState(false)

    function post() {
        const userId = localStorage.getItem("userId")
        if (status) {
            ApiService.addProfile(userId, formValues).then((e) => {
                console.log(e);
            }).catch((err) => {
                console.log(err);
            })

        }
        else {
            ApiService.updateProfile(userId, formValues).then((e) => {
                console.log(e);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    async function getProfile(userId) {
        try {
            await ApiService.getProfile(userId).then((e) => {
                const { userName, email, province, city, phone, date, adress } = e.data
                setFormValues({ ...formValues, userName: userName, email: email, province: province, city: city, phone: phone, date: new Date(date), adress: adress })
            }).catch((e) => {
                console.log(e);
            })
        }
        catch { }
    }

    useEffect(() => {
        const { email, name, _id } = JSON.parse(localStorage.getItem("user"))
        setFormValues({ ...formValues, email: email, userName: name })
        validations("userName", name)
        getProfile(_id)
    }, [])

    return (
        <section style={{ width: '54%', padding: '20px', background: 'var(--homeR-bg-color)', borderRadius: "15px" }}>
            <div style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '900' }}>
                <span style={{ color: "var(--nav-text-color)" }}>Change Profile</span>
            </div>
            <div className={style.d} style={{ padding: '15px', borderRadius: '15px', color: 'var(--nav-text-color)', background: 'var(--summary-bg-color)' }}>
                <div className="flex flex-column gap-2" style={{ marginBottom: "25px", position: "relative" }}>
                    <label htmlFor="username">{t('userName')}*</label>
                    <InputText onChange={handleFormValue} value={formValues.userName} name='userName' className={`${style.input} ${formValues.userName ? (formError.userName ? style.red : style.green) : style.input}`} id="username" aria-describedby="username-help" style={{ borderRadius: '10px' }} />
                    <small style={{ position: "absolute", bottom: "-20px", color: '#ff9c4d' }}>{formError.userName}</small>
                </div>
                <div className="flex flex-column gap-2" style={{ marginBottom: "25px", position: "relative" }}>
                    <label htmlFor="email">{t('email')}*</label>
                    <InputText disabled onChange={handleFormValue} value={formValues.email} name='email' className={`${style.input} ${formValues.email ? (formError.email ? style.green : style.green) : style.input}`} id="email" aria-describedby="username-help" />
                    <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{formError.email}</small>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div className="flex flex-column gap-1" style={{ width: "49%", position: "relative" }}>
                        <label htmlFor="calendar" className="font-bold block mb-2">{t("bDate")}</label>
                        <Calendar onChange={handleFormValue} name='date' className={`${style.input} ${formValues.date ? (formError.date ? style.red : style.green) : style.input}`} id='calendar' value={formValues.date} showIcon />
                        <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{formError.date}</small>
                    </div>
                    <div className="flex flex-column gap-1" style={{ width: "49%", position: "relative" }}>
                        <label htmlFor="phone" className="font-bold block mb-2">{t('phone')}</label>
                        <InputText onChange={handleFormValue} value={formValues.phone} name='phone' className={`${style.input} ${formValues.phone ? (formError.phone ? style.red : style.green) : style.input}`} id="phone" placeholder="(994) 55-555-55-55"></InputText>
                        <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{formError.phone}</small>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div className="flex flex-column gap-2" style={{ width: "49%", position: "relative" }}>
                        <label htmlFor="province">{t('province')}</label>
                        <InputText onChange={handleFormValue} value={formValues.province} name='province' className={`${style.input} ${formValues.province ? (formError.province ? style.red : style.green) : style.input}`} id="province" aria-describedby="username-help" />
                        <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{formError.province}</small>
                    </div>
                    <div className="flex flex-column gap-2" style={{ width: "49%", position: "relative" }}>
                        <label htmlFor="city">{t('city')}</label>
                        <InputText onChange={handleFormValue} value={formValues.city} name='city' className={`${style.input} ${formValues.city ? (formError.city ? style.red : style.green) : style.input}`} id="city" aria-describedby="username-help" />
                        <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{formError.city}</small>
                    </div>
                </div>
                <div className="flex flex-column gap-2" style={{ marginBottom: "20px", position: "relative" }}>
                    <label htmlFor="adress">{t('adress')}</label>
                    <InputText style={{ height: '100px' }} onChange={handleFormValue} value={formValues.adress} name='adress' className={`${style.input} ${formValues.adress ? (formError.adress ? style.red : style.green) : style.input}`} id="adress" aria-describedby="username-help" />
                    <small style={{ position: "absolute", bottom: "-20px", color: "#ff9c4d" }}>{formError.adress}</small>
                </div>
                <button style={{ backgroundColor: "darkcyan", borderRadius: "10px", padding: '8px', width: "100%", margin: '0' }} onClick={post}>{t('saveChanges')}</button>
            </div>
        </section >
    )
}