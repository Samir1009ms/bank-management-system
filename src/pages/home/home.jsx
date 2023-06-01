import React, { useEffect, useState } from "react";
import style from "./design/style.module.css";
import { Charts } from "../../components/charts/chart";
import moment from "moment/moment";

import { getCard } from '../../store/asyncthunk/bankCard-service';
import { getTransactions } from '../../store/asyncthunk/transactions-service';
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "../../components/transactions/transactions";
import { io } from "socket.io-client";

import 'moment/locale/az'
import BankCards from "../../components/credit-card/BankCards";


import { InputNumber } from 'primereact/inputnumber';
import { AiOutlineSend } from 'react-icons/ai'
export function Home() {
    const dispatch = useDispatch();
    const total = useSelector((state) => state.card.total);
    const loading = useSelector((state) => state.card.loading);
    const error = useSelector((state) => state.card.error);
    // const d = useSelector((state) => state.transactionsSlice.transactions)
    const incom = useSelector((state) => state.transactionsSlice.incoming)
    const [notifications, setNotifications] = useState([]);

    let cardData = useSelector((state) => state.card.cards);

    useEffect(() => {
        dispatch(getCard());
        dispatch(getTransactions())

        const socket = io('http://localhost:3003');

        // Bildirimleri dinleme
        socket.on('notification', (message) => {
            dispatch(getTransactions())
            dispatch(getCard());

            // Yeni bildirimi bildirimler listesine ekleme
            setNotifications((prevNotifications) => [...prevNotifications, message]);
            console.log(message);
            console.log("s");
        });

        // Temizlik işlemleri
        console.log("s");
        return () => {
            // Socket bağlantısını kapatma
            socket.disconnect();
        };
    }, [dispatch]);

    // !--------------------------------------------------------------------------------
    const [moneys, setMoney] = useState();
    const [ay, setAy] = useState("az")
    useEffect(() => {
        const result = [];
        // const ds = moment().locale(ay).month("Yanvar").format("M") !//!az en ay reqemi
        // console.log("ss", ds);
        const months = moment.months();
        months.forEach((month) => {
            result.push({ month: month, amount: 0 });
        });
        incom && incom.forEach((transaction) => {
            const month = moment(transaction.date).format("MMMM");
            const index = result.findIndex((item) => item.month === month);
            if (index !== -1) {
                result[index].amount += transaction.amount;
            }
        });
        setMoney(result);
    }, [incom]);

    const [value, setValue] = useState();

    const [designs, setDesigns] = useState("hidden")
    const [cardActive, setCardActive] = useState(0)


    function handleDesign() {

        if (designs === "hidden") {
            setDesigns("flex")
        } else {
            setDesigns("hidden")
        }

    }

    function handleActive(i) {
        setCardActive(i)
        setDesigns("hidden")

    }


    return (
        loading ? (
            loading
        ) : (
            <main className={`${style.home} grid m-0 w-full pl-4 column-gap-3`}>
                <section className={` ${style.homeLeftxx} pt-4 pb-6`}>
                    <div className={`${style.mainTop} hidden lg:flex grid w-full`}>
                        {/* //! top */}
                        <div className={`${style.balansCont} p-3  col-4`}>
                            <div className={`${style.balans}  `}>
                                {/* //! total balans */}
                                <span className={`${style.total}`}>total balance</span>
                                <span className={`${style.amout}`}>$ {total.toLocaleString('en-US')}</span>
                            </div>
                            <div className={`${style.balans}`}>
                                {/* //! credit limit */}
                                <span className={`${style.total}`}>credit limit</span>
                                <span className={`${style.limit}`}>$ 1,743</span>
                            </div>
                            <button className={`${style.paymentBtn}`}>Make a payment</button>
                        </div>
                        <div className={`${style.chart}`}>
                            <Charts money={moneys}></Charts>
                        </div>
                    </div>
                    <div className={`flex w-full gap-3 mt-6 ${style.transactions}`}>
                        <h2 className={`${style.basliq}`}>Transactions</h2>
                        <div className={`flex column-gap-3 ${style.table}`}>
                            <Transaction />
                        </div>
                    </div>
                </section>
                <section className={`pt-4 pb-6 ${style.left} `}>
                    <div className={`grid  row-gap-6  justify-content-center m-0`} style={{ width: "100%", height: "490px", color: "white" }}>
                        <div style={{ width: "100%", height: "230px" }}>
                            <h3 className={`${style.textW}`}>Wallet</h3>
                            <BankCards cardData={cardData && cardData} />
                        </div>
                        <div className={`${style.transfer}`}>
                            <h3 className={`${style.textW}`}>Quick Transfer</h3>
                            <div className={style.transferContainer}>
                                <div className={style.top}>
                                    <input className={style.transferInput} type="number" value={value} name="" onChange={(e) => setValue(e.value)} id="" />
                                    <button className={style.transferBtn}><AiOutlineSend /></button>
                                </div>
                                <div className={style.bottom} >

                                    <div onClick={() => handleDesign()} className={style.debit}>
                                        <span>{cardData && cardData[cardActive].cardNumber}</span>
                                        {/* <input type="text" value={cardData && cardData[cardActive].cardNumber} /> */}
                                        <span>${cardData && cardData[cardActive].balance}</span>
                                    </div>
                                    <div className={`${style.debitDropDown} ${style.debit} ${designs}`}>
                                        {
                                            cardData && cardData.map((e, i) => (
                                                <div onClick={() => handleActive(i)} key={i}>
                                                    <span>{e.cardNumber.slice(12).replace("", "**")}</span>
                                                    <span>{e.balance}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
        )

    );
}