import React from 'react'
import EditProfileCont from './EditProfileCont'
import { useTranslation } from 'react-i18next';

export default function EditProfile() {
    const { t } = useTranslation();


    return (
        <section style={{ background: 'white', width: '100%', padding: '20px' }}>
            <EditProfileCont />
        </section>
    )
}
