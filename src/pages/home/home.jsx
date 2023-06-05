import React, { memo, useEffect } from "react";
import style from "./design/style.module.scss";
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { getTransactions } from '../../store/asyncthunk/transactions-service';
import { useDispatch, useSelector } from "react-redux";
import Transaction from "../../components/transactions/transactions";
import { io } from "socket.io-client";
import 'moment/locale/az'
// import { useTranslation } from "react-i18next";
import Overwiev from "../../components/Overwiev/Overwiev";
import Sidebar from "../../components/SideBar/Sidebar";
// import LanguageSwitcher from "../../components/translate/TranslateSwitch";

function Home() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.transactionsSlice.loading);
    // const error = useSelector((state) => state.card.error);
    // const d = useSelector((state) => state.transactionsSlice.transactions)
    // const incom = useSelector((state) => state.transactionsSlice.incoming)
    // const [notifications, setNotifications] = useState([]);
    // const [loading, setLoading] = useState(true)
    // console.log(totalicom);c
    console.log("s");
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


    // const { t } = useTranslation();
    return (
        loading ? (
            loading
        ) : (
            <main className={`${style.home} grid m-0 w-full pl-4 column-gap-3`}>
                {/* <LanguageSwitcher /> */}
                {/* <p>{t('welcome')}</p> */}
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