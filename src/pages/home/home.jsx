import React, { useEffect, useState } from 'react';
// import { AuthService } from '../../services/auth.services'
// import { HomeHeader } from '../../components/home_header/homeHeader'
import style from "./design/style.module.css"
import { ApiService } from '../../services/api.services';
import { Charts } from '../../components/charts/chart';
import moment from 'moment/moment';


export function Home() {
    const [total, setTotal] = useState(0)


    const [card, setCard] = useState("")
    const [loading, setLoading] = useState(true);

    const [incoming, setIncoming] = useState([])
    const [moneys, setMoney] = useState()

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
            let userId = localStorage.getItem("userId")
            ApiService.card(userId)
                .then((data) => {
                    setCard(data)
                    setTotal(data.cards.reduce((acc, item) => acc + item.balance, 0))

                    setLoading(false)
                    Incomings(userId)
                    return data

                }).catch((err) => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    async function Incomings(userId) {
        setLoading(true)
        await ApiService.transctions(userId)
            .then((data) => {


                setIncoming(data.filter((e) => e.type !== "Outgoing"))
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
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

    useEffect(() => {
        getCard()
    }, [])

    return (
        <main className={`${style.home} grid m-0 w-full`}>
            {loading ? loading : (
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
                            <button className={`${style.paymentBtn}`}>
                                Make a paymant
                            </button>
                        </div>
                        <div className={`col-8`}>
                            <Charts money={moneys}></Charts>
                            {card && card.cards.map((e, i) => {

                                return (
                                    <div key={i}>
                                        <div>{e.cardNumber}</div>
                                        <div>{e.cardName}</div>
                                        <div>{e.cardType}</div>
                                        <div>{e.cardDate}</div>
                                        <div>{e.cardCvv}</div>
                                    </div>
                                )

                            })}

                        </div>
                    </div>
                    <div>
                        {/* //! bottom */}
                        <div>\
                            {/* //! transactions */}
                        </div>
                        <div>
                            {/* //! account summary */}

                        </div>
                    </div>
                </section>
            )}
        </main>
    )

}
