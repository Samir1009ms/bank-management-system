import React, { useEffect, useState } from 'react'
import ProfileTop from '../../components/Profile/ProfileTop'
import ProfileContainer from '../../components/Profile/ProfileContainer'
import { profileTop, profileCenter, profileBottom } from '../../components/data/data'
import style from './style.module.scss'
import Loading from '../../components/loading/Loading'
export default function Settings() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])
    return (
        loading ? < Loading /> :
            <div>
                <section className={style.settings} >
                    <ProfileTop />
                    <ProfileContainer data={profileTop} />
                    <ProfileContainer data={profileCenter} />
                    <ProfileContainer data={profileBottom} />
                </section>
            </div>
    )
}
