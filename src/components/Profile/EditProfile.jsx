import React from 'react'
import EditProfileCont from './EditProfileCont'
import { useTranslation } from 'react-i18next';
import ConfirmPassword from './ConfirmPassword';

export default function EditProfile() {
    const { t } = useTranslation();


    return (
        <section style={{ background: 'none', width: '100%', padding: '20px', display: "flex", alignItems: 'flex-start', justifyContent: "space-between" }}>
            <EditProfileCont />
            <ConfirmPassword />
        </section>
    )
}
