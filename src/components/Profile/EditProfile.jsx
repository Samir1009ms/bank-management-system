import React, { useEffect, useState } from 'react'
import EditProfileCont from './EditProfileCont'
import ConfirmPassword from './ConfirmPassword';
import Loading from '../loading/Loading';

export default function EditProfile() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])
    return (
        loading ? <Loading /> :
            <section style={{ background: 'none', width: '100%', padding: '20px', display: "flex", alignItems: 'flex-start', justifyContent: "space-between" }}>
                <EditProfileCont />
                <ConfirmPassword />
            </section>
    )
}
