import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        // localStorage.setItem('lang', selectedLanguage)
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <select onChange={handleChangeLanguage}>
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
        </select>
    );
}

export default LanguageSwitcher;