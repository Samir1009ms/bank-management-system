import React from 'react'
import EditProfileCont from './EditProfileCont'
import ConfirmPassword from './ConfirmPassword';

export default function EditProfile() {
    return (
        <section style={{ background: 'none', width: '100%', padding: '20px', display: "flex", alignItems: 'flex-start', justifyContent: "space-between" }}>
            <EditProfileCont />
            <ConfirmPassword />
        </section>
    )
}
