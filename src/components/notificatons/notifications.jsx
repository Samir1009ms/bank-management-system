import { Badge } from "primereact/badge";
import style from './design/style.module.scss'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ApiService } from "../../services/api.services";


export function Notification() {

    const [say, setSay] = useState(0)
    const [notifications, setNotifications] = useState([]);


    async function not() {
        const userId = localStorage.getItem("userId")
        try {
            ApiService.notii(userId).then((data) => {
                console.log(data);
                setSay(data.length)
                setNotifications(data)
            })
        }
        catch { }
    }


    useEffect(() => {
        // Socket.io istemcisini oluşturma ve sunucuya bağlanma
        const socket = io('http://localhost:3003');
        not()
        // // Bildirimleri dinleme
        socket.on('notification', (message) => {
            // Yeni bildirimi bildirimler listesine ekleme
            setNotifications((prevNotifications) => [...prevNotifications, message]);
            console.log(message);
            console.log("s");
            not()
        });

        // Temizlik işlemleri
        console.log("s");
        return () => {
            // Socket bağlantısını kapatma
            socket.disconnect();
        };

    }, []);



    const [notificat, setNotificat] = useState("hidden")
    function notification() {
        if (notificat === "flex") {
            setNotificat("hidden")
        } else {
            setNotificat("flex")
        }

    }
    return (
        <div className={`${style.notification}`}>
            <i onClick={() => notification()} className={`pi pi-bell p-overlay-badge ${style.icons}`} style={{ fontSize: '22px' }}>
                <Badge className={style.pBadge} value={say}></Badge>
            </i>
            <div className={`${style.bildirisCont} ${notificat}`} style={{}}>
                <p>
                    {notifications.map((e, i) => (


                        <span key={i}>{e.message}</span>



                    ))}
                </p>
            </div>
        </div>
    )
}