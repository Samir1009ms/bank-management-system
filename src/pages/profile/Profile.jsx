import React from 'react'
import ProfileTop from '../../components/Profile/ProfileTop'
import ProfileContainer from '../../components/Profile/ProfileContainer'
import { profileTop, profileCenter, profileBottom } from '../../components/data/data'

export default function Profile() {
    return (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rowGap: "30px", padding: "80px 0" }}>
            <ProfileTop />
            <ProfileContainer data={profileTop} />
            <ProfileContainer data={profileCenter} />
            <ProfileContainer data={profileBottom} />
        </section>
    )
}
