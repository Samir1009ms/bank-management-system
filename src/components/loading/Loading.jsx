import React from 'react'
import loading from '../../assets/loading.gif'

export default function Loading() {
    return (
        <div style={{ position: "absolute", height: '100vh', width: '100%', top: '0', left: "0", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img style={{ width: '100%', height: "100%" }} src={loading} alt="" />
        </div>
    )
}
