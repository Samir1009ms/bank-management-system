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
import QuickTransfer from "../../components/QuickTransfer/QuickTransfer";
import Loading from "../../components/loading/Loading";
import { setLoading } from "../../store/expense/transactions-slice";
function Home() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.transactionsSlice.loading);
    useEffect(() => {
        // dispatch(getCard());
        dispatch(getTransactions())
        dispatch(setLoading(true));

        const socket = io('http://localhost:3000');
        socket.on('notification', (message) => {
            dispatch(getTransactions())
            // dispatch(getCard());
            // setNotifications((prevNotifications) => [...prevNotifications, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    return (

        loading ? <Loading /> : <main className={`${style.home} grid m-0 w-full pt-5 pl-4 column-gap-3`}>
            <section className={` ${style.homeLeftxx}  pb-6`}>
                <Overwiev />
                <div className='grid block md:hidden' style={{ width: '100%' }}>
                    <QuickTransfer />
                </div>
                <Transaction />
            </section >
            <Sidebar />
        </main >
    );
}
export default memo(Home)