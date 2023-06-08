import React, { useEffect, useRef, useState } from 'react'
import { Avatar } from 'primereact/avatar';
import style from './design/style.module.scss'
export default function ProfileTop() {
    const [user, setUser] = useState()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
    }, [])

    const [img, setImg] = useState('');
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const image = reader.result;
            setImg(image);
            console.log(image);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const inputRef = useRef()

    const handleInputChange = () => {
        inputRef.current.click()
    }
    return (
        <section style={{
            width: '60%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '0 0 45px', background: '#000', borderRadius: '14px'
        }}>
            <section style={{ width: '70%', display: 'flex', alignItems: 'center    ', justifyContent: 'flex-start', flexDirection: 'column', rowGap: '10px' }
            } >
                <div style={{ position: 'relative', width: '20%', marginTop: '-40px' }}>
                    <Avatar
                        label={user && user.name[0]}
                        size="xlarge"
                        image={img}
                        shape="circle"
                        style={{ borderRadius: '50%', width: '100px', height: "100px", objectFit: "cover" }} />
                    <span
                        onClick={handleInputChange}
                        style={{ width: '40px', height: "40px", background: '#000', borderRadius: "50%", display: 'flex', alignItems: 'center', justifyContent: "center", position: 'absolute', right: '0', bottom: '-9px' }}>
                        <i className={`pi pi-pencil ${style.pen}`} style={{ position: 'relative' }}>
                        </i>
                        <input ref={inputRef} onChange={handleImageChange} type="file" name="" id="" style={{ visibility: 'hidden', position: "absolute", top: 0, left: 0, zIndex: -2 }} />
                    </span>
                </div>
                <div style={{ color: "white", display: "flex", flexDirection: 'column', alignItems: 'center', rowGap: '10px' }}>
                    <span style={{ fontSize: "30px", textTransform: "capitalize" }}>{user && user.name}</span>
                    <p>
                        <span style={{ marginRight: '5px' }}>{user && user.email}</span>
                        |
                        <span style={{ marginLeft: '5px' }}>{user && user.phone ? user.phone : '+994552351009'}</span>
                    </p>
                </div>
            </ section>
        </section>
    )
}