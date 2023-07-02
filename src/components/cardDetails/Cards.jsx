import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import './design/style.scss';
import { IoIosCopy } from 'react-icons/io';
import Charts from './Charts';
import moment from 'moment';

export default function Card({ card, transactions }) {
    // const { id } = useParams();
    // const [card, setCard] = useState();
    // const [transactions, setTransactions] = useState();

    // async function getCardTransactions(number) {
    //     try {
    //         const res = await axios.get(`http://localhost:5500/api/getTransactionsDetails/${number}`);
    //         console.log(res.data);
    //         // setCard(res.data.card);
    //         const data = res.data.filter((transaction) => transaction.type !== 'Outgoing');
    //         const months = moment.months()
    //         const ay = []
    //         months.map((month) => (
    //             ay.push({ month: month, amount: 0 })
    //         ))
    //         data.forEach(e => {
    //             const month = moment(e.date).format("MMMM")
    //             const index = ay.findIndex((i) => i.month === month)
    //             if (index !== -1) {
    //                 ay[index].amount += e.amount
    //             }
    //         });
    //         setTransactions(ay);

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     axios.get(`http://localhost:5500/api/getCardDetails/${id}`).then((res) => {
    //         console.log(res.data);
    //         setCard(res.data.card);
    //         getCardTransactions(res.data.card.cardNumber);
    //     }
    //     ).catch((err) => {
    //         console.log(err);
    //     })
    // }, [])

    return (
        <div className='cards__details'>
            <div className='cardLeft' >
                <div className='cardLeft-title' >
                    <h1 className='cardLeft-title__text' >Card</h1>
                </div>
                <div className='div' style={{ width: '300px' }}>
                    {
                        card && <Cards
                            number={`${card.cardNumber.slice(0, 4)} **** **** ${card.cardNumber.slice(12)}`}
                            expiry={card.cardDate}
                            cvc={card.cardCvv}
                            name={card.cardName}
                        />
                    }
                </div>
            </div>
            <div className='cardRigth' >
                <div className='cardRigth-title' >
                    <h1 className='cardRigth-title__text'>Card Details</h1>
                </div>
                <div className='cardRigth-details'>
                    <div className='cardRigth-details__cont'>
                        <h3 className='cardRigth-details__cont-title'>Kart Sahibi:
                            <span className='cardRigth-details__cont-title__text'>{card && card.cardName}</span>
                        </h3>
                    </div>
                    <div className='cardRigth-details__cont'>
                        <h3 className='cardRigth-details__cont-title'>Card Number:
                            <span className='cardRigth-details__cont-title__text'>{card && card.cardNumber}</span>
                        </h3>
                        <button>
                            <IoIosCopy />
                        </button>
                    </div>
                    <div className='cardRigth-details__cont'>
                        <h3 className='cardRigth-details__cont-title'>Balance:
                            <span className='cardRigth-details__cont-title__text'>{card && card.balance} Azn</span>
                        </h3>
                    </div>
                    <div className='cardRigth-details__cont'>
                        <h3 className='cardRigth-details__cont-title'>Cvv:
                            <span className='cardRigth-details__cont-title__text'>*** btn hide show</span>
                        </h3>
                    </div>
                    <div className='cardRigth-details__cont'>
                        <h3 className='cardRigth-details__cont-title'>date:
                            <span className='cardRigth-details__cont-title__text'>{card && card.cardDate}</span>
                        </h3>
                    </div>

                    <div className='cardRigth-details__cont'>
                        {/*//! True bloklamaq False blokdan cixarmaq  */}
                        <button className='cardRigth-details__cont-btn'>{card && (!card.blocked) ? 'karti blokdan cixarmaq' : 'karti bloklamaq'}</button>
                    </div>

                </div>
            </div>
            {transactions && <Charts data={transactions} />}
        </div>
    )
}
