import React, { useEffect, useState } from 'react'
import Card from './Cards'
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Transaction from './Transactions';
import Loading from '../loading/Loading';
import { ApiService } from '../../services/api.services';

export default function CardDetails() {
    const { id } = useParams();
    const [card, setCard] = useState();
    const [transactions, setTransactions] = useState();
    const [dataX, setData] = useState();
    const [loading, setLoading] = useState(true);

    async function getCardTransactions(number) {
        try {
            ApiService.getTransactionsDetails(number).then((res) => {
                setData(res.data);
                const data = res.data.filter((transaction) => transaction.type !== 'Outgoing');
                const months = moment.months()
                const ay = []
                months.map((month) => (
                    ay.push({ month: month, amount: 0 })
                ))
                data.forEach(e => {
                    const month = moment(e.date).format("MMMM")
                    const index = ay.findIndex((i) => i.month === month)
                    if (index !== -1) {
                        ay[index].amount += e.amount
                    }
                });
                setTransactions(ay);
                setLoading(false);
            })
        } catch (err) {
            console.log(err);
        }
    }
    function cardDetails() {
        ApiService.cardDetails(id).then((res) => {
            setCard(res.data.card);
            getCardTransactions(res.data.card.cardNumber);
        }
        ).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        cardDetails()
    }, [id])

    const [dataGroup, setDataGroup] = useState([])

    useEffect(() => {
        if (dataX) {
            const s = [...dataX]
            const sorts = s.sort((a, b) => b.date.localeCompare(a.date))
            const dataGroup = sorts.reduce((acc, date) => {
                const [month, year] = moment(date.date).format("MMMM YYYY").split(" ")
                const dateKey = `${month} ${year}`
                if (!acc[dateKey]) {
                    acc[dateKey] = []
                }
                acc[dateKey].push(date)
                return acc
            }, {})
            const group = Object.entries(dataGroup).map(([date, transctions]) => ({
                date,
                transctions
            }))
            setDataGroup(group)
        }
    }, [dataX])

    return (
        <section>
            {loading ? <Loading /> :
                <>
                    <div>
                        <Card cardDetails={cardDetails} card={card && card} transactions={transactions && transactions} />
                    </div>
                    <div>
                        <Transaction dataGroup={dataGroup && dataGroup} />
                    </div>
                </>
            }
        </section>
    )
}