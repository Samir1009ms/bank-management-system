import React from 'react'
import ProfileTop from '../../components/Profile/ProfileTop'
import ProfileContainer from '../../components/Profile/ProfileContainer'
import { profileTop, profileCenter, profileBottom } from '../../components/data/data'
import style from './style.module.scss'
export default function Settings() {
    return (
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
