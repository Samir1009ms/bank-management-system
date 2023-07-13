import React, { useEffect } from 'react'
import style from "./design/style.module.scss";
import BankCards from '../credit-card/BankCards';
import QuickTransfer from '../QuickTransfer/QuickTransfer';
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';

export default function Sidebar() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCard());
        const socket = io('http://localhost:3000');
        socket.on('notification', (message) => {
            dispatch(getCard());
            // dispatch(setLoading(true))
            // setNotifications((prevNotifications) => [...prevNotifications, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);
    const loading = useSelector((state) => state.card.loading);
    return (
        loading
            ?
            // <Loading />
            "sidebar loading"
            : <section className={`pt-2 mt-0 ${style.left} `}>
                <div className={`grid ${style.container} row-gap-6  justify-content-center m-0`} style={{ width: "100%", color: "white" }}>
                    <BankCards />
                    <div className='grid hidden sm:hidden lg:block' style={{ width: "98%" }}>
                        <QuickTransfer />
                    </div>
                </div>
            </section>
    )
}
