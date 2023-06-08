import React, { memo, useEffect } from "react";
import style from "./design/style.module.scss";
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { getTransactions } from '../../store/asyncthunk/transactions-service';
import { useDispatch, useSelector } from "react-redux";
import Transaction from "../../components/transactions/transactions";
import { io } from "socket.io-client";
import 'moment/locale/az'
import Overwiev from "../../components/Overwiev/Overwiev";
import Sidebar from "../../components/SideBar/Sidebar";

function Home() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.transactionsSlice.loading);
    useEffect(() => {
        dispatch(getCard());
        dispatch(getTransactions())
        const socket = io('http://localhost:3003');
        socket.on('notification', (message) => {
            dispatch(getTransactions())
            dispatch(getCard());
            // setNotifications((prevNotifications) => [...prevNotifications, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);
    return (
        loading ? (
            loading
        ) : (
            <main className={`${style.home} grid m-0 w-full pl-4 column-gap-3`}>
                <section className={` ${style.homeLeftxx} pt-4 pb-6`}>
                    <Overwiev />
                    <Transaction />
                </section >
                <Sidebar />
            </main >
        )
    );
}
export default memo(Home)