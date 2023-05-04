import React, { useEffect, useState } from 'react';
// import { AuthService } from '../../services/auth.services'
// import { HomeHeader } from '../../components/home_header/homeHeader'
import style from "./design/style.module.css"
import { ApiService } from '../../services/api.services';


export function Home() {
    const [total, setTotal] = useState(0)


    const [card, setCard] = useState("")
    const [loading, setLoading] = useState(true);

    async function getCard() {
        try {
            let userId = localStorage.getItem("userId")
            // setLoading(true)
            ApiService.card(userId).then((data) => {
                setCard(data)
                setTotal(data.cards.reduce((acc, item) => acc + item.balance, 0))
                console.log(data);
                console.log(card);

                setLoading(false)
                return data


            }).catch((err) => {
                console.log(err);
            })
        } catch {
            console.log("error");
        }

    }

    useEffect(() => {
        setTimeout(() => {
            getCard()
        }, 90);
    }, [])

    // useEffect(() => {
    //     // var v = card
    //     console.log(card);
    // }, [card]);

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
                            charts
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
