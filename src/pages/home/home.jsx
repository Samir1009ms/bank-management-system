import React, { memo, useEffect, useState } from "react";
import style from "./design/style.module.scss";
import Charts from "../../components/charts/chart";
import moment from "moment/moment";

import { getCard } from '../../store/asyncthunk/bankCard-service';
import { getTransactions } from '../../store/asyncthunk/transactions-service';
import { useDispatch, useSelector } from "react-redux";
import Transaction from "../../components/transactions/transactions";
import { io } from "socket.io-client";

import 'moment/locale/az'
import BankCards from "../../components/credit-card/BankCards";


import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from "primereact/radiobutton";
import { AiOutlineSend } from 'react-icons/ai'
import { FiChevronDown } from 'react-icons/fi'
import LanguageSwitcher from "../../components/translate/TranslateSwitch";
import { useTranslation } from "react-i18next";


function Home() {
    const dispatch = useDispatch();
    const total = useSelector((state) => state.card.total);
    // const loading = useSelector((state) => state.transactionsSlice.loading);
    // const error = useSelector((state) => state.card.error);
    // const d = useSelector((state) => state.transactionsSlice.transactions)
    // const incom = useSelector((state) => state.transactionsSlice.incoming)
    // const [notifications, setNotifications] = useState([]);
    let cardData = useSelector((state) => state.card.cards);
    const [loading, setLoading] = useState(true)
    // console.log(totalicom);c
    console.log("s");
    useEffect(() => {
        console.log("render");
        if (total) {
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
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

    const [value, setValue] = useState();

    const [designs, setDesigns] = useState("hidden")


    function handleDesign() {
        if (designs === "hidden") {
            setDesigns("flex")
        } else {
            setDesigns("hidden")
        }
    }

    const [ingredient, setIngredient] = useState(0)
    const [cardActive, setCardActive] = useState(ingredient)
    function handleActive(i) {
        setIngredient(i)
        setDesigns("hidden")
        setCardActive(i)
    }

    const { t } = useTranslation();
    return (
        loading ? (
            loading
        ) : (
            <main className={`${style.home} grid m-0 w-full pl-4 column-gap-3`}>
                {/* <LanguageSwitcher /> */}
                {/* <p>{t('welcome')}</p> */}
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
                            <Charts></Charts>
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
                                    <input minLength={16} maxLength={16} className={style.transferInput} type="number" value={value} name="" onChange={(e) => setValue(e.value)} id="" />
                                    <button className={style.transferBtn}><AiOutlineSend /></button>
                                </div>
                                <div className={style.bottom} >
                                    <div onClick={() => handleDesign()} className={style.debit}>
                                        <div className={style.debitCards}>
                                            <div className={style.cardLeft}>
                                                <span className={style.cardDesign}>
                                                    <span className={style.cardType}>{cardData ? cardData[cardActive].cardType : "Card"}</span>
                                                    <span className={style.cardNumber}> {cardData && cardData[cardActive].cardNumber.slice(12).replace("", "**")}</span>
                                                </span>
                                                <span className={style.cardText}>
                                                    <span>Debit Card</span>
                                                    $ {(cardData ? cardData[cardActive].balance : "0000").toLocaleString("en-US")}
                                                </span>
                                            </div>
                                            <div>
                                                <FiChevronDown />
                                            </div>
                                        </div>
                                        <div className={`${style.debitDropDown} ${designs}`}>
                                            {
                                                cardData ? cardData.map((e, i) => (
                                                    <div id="x" className={`${style.bankCardCont}`} onClick={() => handleActive(i)} key={i}>
                                                        <div className={style.cardLeft}>
                                                            <span className={style.cardDesign}>
                                                                <span className={style.cardType}>{e.cardType}</span>
                                                                <span className={style.cardNumber}> {e.cardNumber.slice(12).replace("", "**")}</span>
                                                            </span>
                                                            <span className={style.cardText}>
                                                                <span>Debit Card</span>
                                                                $ {(e.balance ? e.balance : "0000").toLocaleString("en-US")}
                                                            </span>
                                                        </div>
                                                        <div className="flex align-items-center">
                                                            <RadioButton inputId="x" name="pizza" value="card" className={style.radio} onChange={(e) => setIngredient(i)} checked={ingredient === i} />
                                                        </div>
                                                    </div>
                                                )) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={style.amount}>
                                    <div className={style.amountCont}>
                                        <span className={style.amountText}>Enter amount</span>
                                        <div className={style.moneyCont}><input className={style.amountInput} type="number" /><span className={style.usd}>$</span></div>

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
export default memo(Home)