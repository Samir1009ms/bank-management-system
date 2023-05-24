import React, { useEffect, useState } from "react";
// import { AuthService } from '../../services/auth.services'
// import { HomeHeader } from '../../components/home_header/homeHeader'
import style from "./design/style.module.css";
import { Charts } from "../../components/charts/chart";
import moment from "moment/moment";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { format } from 'date-fns';
import DoughnutChartDemo from "../../components/charts/chart2";
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { getTransactions } from '../../store/asyncthunk/transactions-service';
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "../../components/transactions/transactions";

export function Home() {
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.card.cardData);
    const total = useSelector((state) => state.card.total);
    const loading = useSelector((state) => state.card.loading);
    const error = useSelector((state) => state.card.error);
    // const d = useSelector((state) => state.transactionsSlice.transactions)
    const incom = useSelector((state) => state.transactionsSlice.incoming)

    useEffect(() => {
        dispatch(getCard());
        dispatch(getTransactions())
    }, [dispatch]);

    // !--------------------------------------------------------------------------------
    const [moneys, setMoney] = useState();
    useEffect(() => {
        const result = [];
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

    return (
        <main className={`${style.home} grid m-0 w-full`}>
            {loading ? (
                loading
            ) : (
                <section className={`w-9 pt-6 pb-6 pl-6`}>
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
                            <button className={`${style.paymentBtn}`}>Make a paymant</button>
                        </div>
                        <div className={`col-8`}>
                            <Charts money={moneys}></Charts>
                        </div>
                    </div>
                    <div className={`flex w-full gap-4 ${style.transactions}`}>
                        <Transaction />
                    </div>
                </section>
            )
            }
        </main >
    );
}