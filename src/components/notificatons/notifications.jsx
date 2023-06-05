import style from './design/style.module.scss'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ApiService } from "../../services/api.services";
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Badge } from "primereact/badge";
import { HiOutlineBanknotes } from 'react-icons/hi2'
export function Notification() {
    const [say, setSay] = useState(0)
    const [notifications, setNotifications] = useState([]);
    async function not() {
        const userId = localStorage.getItem("userId")
        try {
            ApiService.notii(userId).then((data) => {
                setSay(data.length)
                setNotifications(data)
            })
        }
        catch {
            console.log("error");
        }
    }

    useEffect(() => {
        const socket = io('http://localhost:3003');
        not()
        socket.on('notification', (message) => {
            // setNotifications((prevNotifications) => [...prevNotifications, message]);
            // console.log(message);
            not()
        });
        socket.on('deleteNotification', (message) => {
            console.log(message);
            not()
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    function delet(e) {
        ApiService.deleteNotifications(e).then((e) => {
            console.log(e);
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
                <Badge className={style.pBadge} value={say}></Badge>
            </i>
            <div className={`${style.bildirisCont} ${notificat}`} style={{}}>
                <div>
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
                        console.log(displayDate);
                        return (
                            <div key={date.day}>
                                <h5>{displayDate}</h5>
                                <ul>
                                    {date.notifications.map((notification) => (
                                        <li key={notification._id}>
                                            <HiOutlineBanknotes />
                                            <p >
                                                <span>Hesaba Medaxil</span>
                                                <span>
                                                    <small>{moment(notification.createdAt).format("HH:mm")}</small>
                                                    <small>{notification.card.slice(0, 4) + "**" + notification.card.slice(12)}</small>
                                                </span>
                                            </p>
                                            <span onClick={() => delet(notification._id)}>{notification.amount.toFixed(2)} azn</span >
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}