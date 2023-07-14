import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';
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
        const selectedLanguage = event
        setLang(selectedLanguage)
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem('lang', selectedLanguage);
    };

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div style={{
            position: "relative",
            width: '100%',
            background: 'var(--summary-bg-color)',
            boxShadow: 'var(--box-shadow)',
            borderRadius: '8px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '10px',
            paddingLeft: '10px',

        }} onClick={handleClick}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    padding: '0',
                    cursor: 'pointer'

                }}
            >{lang} <FiChevronDown /></div>
            {isOpen &&

                <div style={{
                    top: '-35px',
                    left: '0',
                    padding: '7px',
                    position: "absolute",
                    background: 'var(--dropDown-bg-color)',
                    width: '100%',
                    zIndex: '999',
                    borderRadius: '8px',

                }}>
                    <div
                        style={{
                            background: 'var(--summary-bg-color)',
                            boxShadow: 'var(--box-shadow)',
                            borderRadius: '8px',
                            padding: '10px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '5px'
                        }}
                        onClick={
                            () => {
                                handleChangeLanguage('en');
                                handleClick()
                            }}
                    >
                        En
                        <input
                            type="radio"
                            name="e"
                            id=""
                            checked={lang === 'en'} />
                    </div>
                    <div
                        style={{
                            background: 'var(--summary-bg-color)',
                            boxShadow: 'var(--box-shadow)',
                            borderRadius: '8px',
                            padding: '10px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'




                        }}
                        onClick={() => { handleChangeLanguage('az'); handleClick() }}>Az <input type="radio" name="e" id="" checked={lang === 'az'} /></div>
                </div>}
        </div>
    );
}

export default LanguageSwitcher;