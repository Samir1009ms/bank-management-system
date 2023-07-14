import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { io } from "socket.io-client";
import { BankCard } from "../../components/wallet/bankCards";
import CurrentBalance from "../../components/wallet/CurrentBalance";
import Charts from "../../components/wallet/Charts";
import axios from "axios";
import moment from "moment";
import Sidebar from "../../components/SideBar/Sidebar";
import AddCart from "../../components/add cart/AddCart";

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
    const [chartData2, setChartData2] = useState([])

    async function getCardData(number) {
        try {
            await axios.get(`http://localhost:5500/api/getTransactionsDetails/${number}`).then((res) => {
                console.log(res.data);
                setCardDataX(res.data);
                const data = res.data.filter((transaction) => transaction.type !== 'Outgoing')
                const data2 = res.data.filter((transaction) => transaction.type === 'Outgoing')
                const months = moment.months()
                const ay = []
                const ay2 = []
                months.map((month) => (
                    ay.push({ month: month, amount: 0 })
                ))
                months.map((month) => (
                    ay2.push({ month: month, amount: 0 })
                ))
                data.forEach(e => {
                    const month = moment(e.date).format("MMMM")
                    const index = ay.findIndex((i) => i.month === month)
                    if (index !== -1) {
                        ay[index].amount += e.amount
                    }
                })
                data2.forEach(e => {
                    const month = moment(e.date).format("MMMM")
                    const index2 = ay2.findIndex((i) => i.month === month)
                    if (index2 !== -1) {
                        ay2[index2].amount += e.amount
                    }
                })
                setChartData(ay)
                setChartData2(ay2)
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
        <section style={{ color: 'var(--nav-text-color)', display: "flex", width: "100%", paddingTop: '30px' }}>
            <div style={{ display: "flex", width: '80%', alignItems: "flex-start", flexWrap: 'wrap', justifyContent: 'center' }}>
                <CurrentBalance />
                <BankCard getCardData={getCardData} />
                <AddCart />
                <Charts data={chartData} data2={chartData2} />
            </div>

            <Sidebar />

        </section>
    )
}