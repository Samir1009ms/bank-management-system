import style from './design/style.module.scss'
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { ApiService } from "../../services/api.services";
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Badge } from "primereact/badge";
import { HiOutlineBanknotes } from 'react-icons/hi2'
import { MdClear } from 'react-icons/md'
export function Notification() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const socket = io('http://localhost:3003');
        async function fetchNotifications() {
            const userId = localStorage.getItem("userId");
            try {
                const data = await ApiService.notii(userId);
                setNotifications(data);
            } catch (error) {
            }
        }
        fetchNotifications();
        const userId = localStorage.getItem("userId");

        socket.on('notification', (message) => {
            if (userId === message.sender) {

                setNotifications((prevNotifications) => [...prevNotifications, message]);
            }
            console.log(message);
        });
        socket.on('deleteNotification', (message) => {
            console.log(message);
        });
        return () => {
            socket.disconnect();
        };
    }, []);


    function delet(e) {
        setNotifications(notifications.filter((x) => x._id !== e))
        console.log(notifications);
        ApiService.deleteNotifications(e).then((e) => {
        }).catch((err) => {
            console.log(err);
        })

    }
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
            const dates = Object.entries(GroupDates).map(([day, notifications]) => ({
                day,
                notifications: notifications
            }))
            setDates(dates)
        }
    }, [notifications])

    const [notificat, setNotificat] = useState("hidden")
    function notification() {
        setNotificat((prevState) => (prevState === "hidden" ? "flex" : "hidden"))
    }
    const { t } = useTranslation()

    const notificationRef = useRef(null);
    const iconRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {

            if (notificationRef.current && !notificationRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
                setNotificat("hidden");
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <div className={`${style.notification}`}>
            <i onClick={() => notification()} ref={iconRef} className={`pi pi-bell p-overlay-badge ${style.icons}`} style={{ fontSize: '22px' }}>
                <Badge className={style.pBadge} value={notifications.length}></Badge>
            </i>
            <div className={`${style.bildirisCont} ${notificat}`} style={{}} ref={notificationRef}>
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