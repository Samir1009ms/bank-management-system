import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import style from './design/bankCards.module.scss';
import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './design/swiper.scss'
import axios from 'axios';
import { set } from 'lodash';
import moment from 'moment';

export function BankCard({ getCardData }) {
    let cardData = useSelector((state) => state.card.cards);
    // let total = useSelector((state) => state.transactionsSlice.total);

    // const [currentCardIndex, setCurrentCardIndex] = useState(0);



    const [state, setState] = useState({
        number: '0000000000000000',
        expiry: '00/00',
        cvc: '000',
        name: 'NO NAME',
        focus: 'TRUE',
    });

    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [cardDataX, setCardDataX] = useState([]);
    const slideChangeHandler = (swiper) => {
        setCurrentIndex(swiper.activeIndex);
    };
    // const [chartData, setChartData] = useState([])
    // async function getCardData(number) {
    //     try {
    //         await axios.get(`http://localhost:5500/api/getTransactionsDetails/${number}`).then((res) => {
    //             console.log(res.data);
    //             setCardDataX(res.data);
    //             const data = res.data.filter((transaction) => transaction.type !== 'Outgoing')
    //             const months = moment.months()
    //             const ay = []
    //             months.map((month) => (
    //                 ay.push({ month: month, amount: 0 })
    //             ))
    //             data.forEach(e => {
    //                 const month = moment(e.date).format("MMMM")
    //                 const index = ay.findIndex((i) => i.month === month)
    //                 if (index !== -1) {
    //                     ay[index].amount += e.amount
    //                 }
    //             })
    //             setChartData(ay)
    //             // ! chartData  Charts data adi altinda getmelidir
    //         }).catch((err) => {
    //             console.log(err);
    //         }
    //         )

    //     }
    //     catch (e) {
    //         console.log(e)
    //     }


    // }

    const [group, setGroup] = useState([])
    useEffect(() => {
        if (cardData.length > 0) {
            console.log(cardData[currentIndex] && cardData[currentIndex].cardNumber);
            getCardData(cardData[currentIndex] && cardData[currentIndex].cardNumber);
        }

    }, [currentIndex, cardData])

    // useEffect(() => {
    //     if (cardDataX.length > 0) {
    //         const data = [...cardDataX]
    //         const sort = data.sort((a, b) => b.date.localeCompare(a.date))
    //         const dataGroup = sort.reduce((acc, date) => {
    //             const [month, year] = moment(date.date).format("MMMM YYYY").split(" ")
    //             const dataKey = `${month} ${year}`
    //             if (!acc[dataKey]) {
    //                 acc[dataKey] = []
    //             }
    //             acc[dataKey].push(date)
    //             return acc
    //         }, {})
    //         const group = Object.entries(dataGroup).map(([date, transactions]) => ({ date, transactions }))
    //         console.log(group);
    //         setGroup(group)
    //         // ! dataGroup adinda Transactions getmelidi
    //     }
    // }, [cardDataX])
    return (
        <div style={{ width: '50%' }}>
            {cardData.length > 0 && <div className={style.cardSlider}>
                <Swiper
                    effect="cards"
                    grabCursor={true}
                    modules={[EffectCards]}
                    onSwiper={(swiper) => {
                        swiper.slideTo(Math.floor(cardData.length / 2));
                        slideChangeHandler(swiper);
                    }}
                    onSlideChange={slideChangeHandler}
                    className='mySwiper'
                >
                    {cardData.map((e, i) => (
                        <SwiperSlide key={i}>
                            <div
                                key={e.cardNumber}
                                className={`${style.cardsContainer}  ${currentIndex === i ? style.active : ''}`}
                            >
                                <Cards
                                    number={`${e.cardNumber.slice(0, 4)} **** **** ${e.cardNumber.slice(12)}` || state.number}
                                    expiry={e.cardDate || state.expiry}
                                    cvc={e.cardCvv || state.cvc}
                                    name={e.cardName || state.name}
                                />
                                <div className={style.total}>
                                    <small className={style.balansText}>{t('current')}</small>
                                    <p className={style.price}>$ {cardData ? e.balance.toLocaleString('en-US') : 0}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>}
        </div>
    );
}
