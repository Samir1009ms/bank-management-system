import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
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
    }, []);

    const handleChangeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        setLang(selectedLanguage)
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem('lang', selectedLanguage);
    };

    return (
        <select value={lang} onChange={handleChangeLanguage}>
            <option value="en">En</option>
            <option value="az">Az</option>
        </select>
    );
}

export default LanguageSwitcher;