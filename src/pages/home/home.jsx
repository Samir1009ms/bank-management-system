import React, { useEffect, useState } from "react";
// import { AuthService } from '../../services/auth.services'
// import { HomeHeader } from '../../components/home_header/homeHeader'
import style from "./design/style.module.css";
import { ApiService } from "../../services/api.services";
import { Charts } from "../../components/charts/chart";
import moment from "moment/moment";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { format } from 'date-fns';

export function Home() {
    const [total, setTotal] = useState(0);

    const [card, setCard] = useState("");
    const [loading, setLoading] = useState(true);

    const [incoming, setIncoming] = useState([]);
    const [moneys, setMoney] = useState();

    // const months = [
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December"
    // ];

    async function getCard() {
        try {
            let userId = localStorage.getItem("userId");
            ApiService.card(userId)
                .then((data) => {
                    setCard(data);
                    setTotal(data.cards.reduce((acc, item) => acc + item.balance, 0));

                    setLoading(false);

                    Incomings(userId);
                    return data;
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const [transction, setTransction] = useState();
    async function Incomings(userId) {
        // setLoading(true)
        await ApiService.transctions(userId)
            .then((data) => {
                setIncoming(data.filter((e) => e.type !== "Outgoing"));
                setTransction(data);
                console.log(transction);
                // setTimeout(() => {
                setLoading(false);

                // }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    async function money() {
        const result = [];
        const months = moment.months();

        months.forEach((month) => {
            result.push({ month: month, amount: 0 });
        });

        incoming.forEach((transaction) => {
            const month = moment(transaction.date).format("MMMM");
            const index = result.findIndex((item) => item.month === month);
            if (index !== -1) {
                result[index].amount += transaction.amount;
            }
        });
        setMoney(result);
    }
    useEffect(() => {
        money();
    }, [incoming]);

    const [tarix, setTarix] = useState()
    useEffect(() => {
        if (transction) {
            const sorts = transction.sort((a, b) => b.date.localeCompare(a.date))
            const groupDates = sorts.reduce((acc, date) => {
                const [month, day, year] = moment(date.date).format("MMMM DD YYYY").split(" ")
                const datesKey = `${month} ${day} ${year}`
                if (!acc[datesKey]) {
                    acc[datesKey] = []
                }
                acc[datesKey].push(date)
                return acc
            }, {})

            const data = Object.entries(groupDates).map(([date, transctions]) => ({
                date,
                transctions
            }))
            setTarix(data)
            console.log(data);
        }
    }, [transction]);

    useEffect(() => {
        setTimeout(() => {
            getCard();
        }, 90);
    }, []);
    const columns = [
        {
            field: 'date',

            body: (rowData) => format(new Date(rowData.date), 'MMMM dd, yyyy'),

        },
        {
            field: 'amount',
        },
        {
            field: 'type',
        },
        {
            field: 'type',
        },
        {
            field: '',
        }
    ];

    return (
        <main className={`${style.home} grid m-0 w-full`}>
            {loading ? (
                loading
            ) : (
                <section className={`w-full p-6`}>
                    <div className={`${style.mainTop} grid col-9`}>
                        {/* //! top */}
                        <div className={`${style.balansCont} p-3  col-4`}>
                            <div className={`${style.balans}  `}>
                                {/* //! total balans */}
                                <span className={`${style.total}`}>total balance</span>
                                <span className={`${style.amout}`}>$ {total}</span>
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
                            {/* {card &&
                                card.cards.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            <div>{e.cardNumber}</div>
                                            <div>{e.cardName}</div>
                                            <div>{e.cardType}</div>
                                            <div>{e.cardDate}</div>
                                            <div>{e.cardCvv}</div>
                                        </div>
                                    );
                                })} */}
                        </div>
                    </div>
                    <div>
                        {/* //! bottom */}
                        <div className="card">

                        </div>
                        <div>
                            {tarix && tarix.map((e, i) => (
                                <div key={i}>
                                    <p style={{ color: "red" }} >{e.date}</p>
                                    <ul>
                                        {e.transctions.map((e, i) => (
                                            // <li key={i}>
                                            //     <div>{e.amount}</div>
                                            //     <div style={{ color: e.type === "Incoming" ? "green" : "blue" }}>{e.type}</div>
                                            //     <div>{moment(e.date).format("MMMM DD YYYY")}</div>
                                            // </li>
                                            <DataTable key={i} value={[e]} tableStyle={{ minWidth: '35rem', maxWidth: '35rem' }}>

                                                {columns.map((col, i) => (
                                                    <Column
                                                        key={i}
                                                        field={col.field}
                                                        body={col.body}
                                                        headerStyle={{ display: 'none' }}
                                                    />
                                                ))}

                                            </DataTable>
                                        ))
                                        }
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div>{/* //! account summary */}</div>
                    </div>
                </section>
            )}
        </main>
    );
}
