import React from 'react'
import PropTypes from 'prop-types';
import LanguageSwitcher from '../translate/TranslateSwitch';
import { Theme } from '../theme/theme';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ProfileContainer({ data }) {
    const { t } = useTranslation()
    const navigate = useNavigate()


    return (
        <section style={{
            width: '60%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '30px 20px', background: 'var(--summary-bg-color)', borderRadius: '10px'
        }}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', rowGap: '10px', color: "#fff" }
            }>
                {data.map((e) => (
                    <div key={e.text} style={{ color: 'var(--nav-text-color)', cursor: "pointer", width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: "10px", fontSize: '16px' }}>
                            <span style={{ fontSize: '19px' }}>{e.icon}</span>
                            {t(`${e.text}`)}
                        </span>
                        {e.status && <div>
                            {
                                (
                                    e.button && (e.text === "Language")
                                        ? <LanguageSwitcher />
                                        : (e.text === "Theme")
                                            ? <Theme />
                                            : (e.text === 'Edit profile information')
                                                ? <button style={{ color: 'white' }} onClick={() => navigate("/profile/editprofile")}>edit</button>
                                                : <button>on</button>
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
