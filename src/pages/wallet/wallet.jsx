import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { io } from "socket.io-client";
import { BankCard } from "../../components/wallet/bankCards";
import CurrentBalance from "../../components/wallet/CurrentBalance";
import Charts from "../../components/wallet/Charts";
import axios from "axios";
import moment from "moment";
export function Wallet() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCard());
        const socket = io('http://localhost:3000');

        socket.on('notification', (message) => {
            dispatch(getCard());
            // setNotifications((prevNotifications) => [...prevNotifications, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    const [cardDataX, setCardDataX] = useState([]);
    const [chartData, setChartData] = useState([])

    async function getCardData(number) {
        try {
            await axios.get(`http://localhost:5500/api/getTransactionsDetails/${number}`).then((res) => {
                console.log(res.data);
                setCardDataX(res.data);
                const data = res.data.filter((transaction) => transaction.type !== 'Outgoing')
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
                })
                setChartData(ay)
                // ! chartData  Charts data adi altinda getmelidir
            }).catch((err) => {
                console.log(err);
            }
            )

        }
        catch (e) {
            console.log(e)
        }
    }
    const [group, setGroup] = useState([])
    useEffect(() => {
        if (cardDataX.length > 0) {
            const data = [...cardDataX]
            const sort = data.sort((a, b) => b.date.localeCompare(a.date))
            const dataGroup = sort.reduce((acc, date) => {
                const [month, year] = moment(date.date).format("MMMM YYYY").split(" ")
                const dataKey = `${month} ${year}`
                if (!acc[dataKey]) {
                    acc[dataKey] = []
                }
                acc[dataKey].push(date)
                return acc
            }, {})
            const group = Object.entries(dataGroup).map(([date, transactions]) => ({ date, transactions }))
            console.log(group);
            setGroup(group)
            // ! dataGroup adinda Transactions getmelidi
        }
    }, [cardDataX])

    return (
        <section style={{ color: 'var(--nav-text-color)' }}>
            <div style={{ display: "flex", width: '100%', alignItems: "center" }}>
                <CurrentBalance />
                <BankCard getCardData={getCardData} />
                <Charts data={chartData} />
            </div>
        </section>
    )
}