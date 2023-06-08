import style from './design/style.module.scss'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ApiService } from "../../services/api.services";
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Badge } from "primereact/badge";
import { HiOutlineBanknotes } from 'react-icons/hi2'
import { MdClear } from 'react-icons/md'
export function Notification() {
    const [notifications, setNotifications] = useState([]);
    // async function not() {
    //     const userId = localStorage.getItem("userId")
    //     try {
    //         ApiService.notii(userId).then((data) => {
    //             setSay(data.length)
    //             setNotifications(data)
    //         })
    //     }
    //     catch {
    //         console.log("error");
    //     }
    // }

    // useEffect(() => {
    //     const socket = io('http://localhost:3003');
    //     not()
    //     socket.on('notification', (message) => {

    //         setNotifications([...notifications, message]);
    //         console.log("deyisiklin oldu")
    //         console.log(message);
    //         // not()
    //     });
    //     socket.on('deleteNotification', (message) => {

    //         console.log(message);
    //     })


    // }, []);
    useEffect(() => {
        const socket = io('http://localhost:3003');

        async function fetchNotifications() {
            const userId = localStorage.getItem("userId");
            try {
                const data = await ApiService.notii(userId);
                setNotifications(data);
            } catch (error) {
                console.log("Hata oluştu: ", error);
            }
        }

        fetchNotifications();

        socket.on('notification', (message) => {
            setNotifications((prevNotifications) => [...prevNotifications, message]);
            console.log("Değişiklik oldu");

            console.log(message);
        });

        socket.on('deleteNotification', (message) => {
            console.log(message);
        });

        // Cleanup
        return () => {
            socket.disconnect();
        };
    }, []);


    function delet(e) {
        setNotifications(notifications.filter((x) => x._id !== e))
        console.log(notifications);
        ApiService.deleteNotifications(e).then((e) => {
            console.log(e);
        }).catch((err) => {
            console.log(err);
        })

    }
    console.log("render");
    const [dates, setDates] = useState([])
    useEffect(() => {
        if (notifications) {
            const dataSorts = notifications.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            const GroupDates = dataSorts.reduce((acc, date) => {
                const [day, month, year] = moment(date.createdAt).format("DD MMMM YYYY").split(" ")
                const dataKey = ` ${day} ${month} ${year}`
                if (!acc[dataKey]) {
                    acc[dataKey] = []
                }
                acc[dataKey].push(date)
                return acc
            }, {})
            console.log(GroupDates);
            const dates = Object.entries(GroupDates).map(([day, notifications]) => ({
                day,
                notifications: notifications
            }))
            setDates(dates)
        }
    }, [notifications])

    const [notificat, setNotificat] = useState("hidden")
    function notification() {
        if (notificat === "flex") {
            setNotificat("hidden")
        } else {
            setNotificat("flex")
        }
    }
    const { t } = useTranslation()
    return (
        <div className={`${style.notification}`}>
            <i onClick={() => notification()} className={`pi pi-bell p-overlay-badge ${style.icons}`} style={{ fontSize: '22px' }}>
                <Badge className={style.pBadge} value={notifications.length}></Badge>
            </i>
            <div className={`${style.bildirisCont} ${notificat}`} style={{}}>

                {dates.map((date) => {
                    const today = moment().format("DD MMMM YYYY");
                    const yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD");
                    const dateToShow = (date.day).trim();
                    let displayDate;
                    if (dateToShow === today) {
                        displayDate = t('today');
                    } else if (dateToShow === yesterday) {
                        displayDate = t('yesterday');
                    } else {
                        displayDate = date.day;
                    }

                    return (
                        <div className={style.bildiris} key={date.day}>
                            <h5 className={style.date}>{displayDate}</h5>
                            <ul className={style.dateList}>
                                {date.notifications.map((notification) => (
                                    <li className={style.list} key={notification._id}>
                                        <span className={style.listLeft}>
                                            <HiOutlineBanknotes />
                                            <p className={style.listInfo} >
                                                <span className={style.listInfoText}>Hesaba Medaxil</span>
                                                <span className={style.listDate}>
                                                    <small>{moment(notification.createdAt).format("HH:mm")},</small>
                                                    <small>{notification.card.slice(0, 4) + "**" + notification.card.slice(12)}</small>
                                                </span>
                                            </p>
                                        </span>
                                        <span className={style.listAmount} >
                                            {
                                                notification.amount.toFixed(2)
                                            }
                                            Azn
                                        </span >
                                        <MdClear className={style.clear} onClick={() => delet(notification._id)} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}