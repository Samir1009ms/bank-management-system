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
import DoughnutChartDemo from "../../components/charts/chart2";
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { getTransactions } from '../../store/asyncthunk/transactions-service';
// import { getTransactions } from "../../store/expense/transactions-slice";
import { useDispatch, useSelector } from "react-redux";

export function Home() {
    const dispatch = useDispatch();
    const cardData = useSelector((state) => state.card.cardData);
    const totals = useSelector((state) => state.card.total);
    const loading = useSelector((state) => state.card.loading);
    const error = useSelector((state) => state.card.error);
    // const d = useSelector((state) => state.transactionsSlice.transactions)
    const d = useSelector((state) => state.transactionsSlice.outcoming)
    console.log(d);
    // console.log(cardData);
    // console.log(totals);
    // console.log(loading);
    useEffect(() => {
        dispatch(getCard());
        dispatch(getTransactions())
    }, [dispatch]);

    // !--------------------------------------------------------------------------------






    const [total, setTotal] = useState(0);
    const [card, setCard] = useState("");
    const [loadin, setLoading] = useState(true);
    const [incoming, setIncoming] = useState([]);
    const [moneys, setMoney] = useState();
    // const dispatch = useDispatch()

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

    // async function getCard() {
    //     try {
    //         ApiService.card(userId)
    //             .then((data) => {
    //                 setCard(data);
    //                 setTotal(data.cards.reduce((acc, item) => (acc + item.balance), 0));
    //                 setLoading(false);
    //                 Incomings(userId);
    //                 return data;
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const [transction, setTransction] = useState();
    async function Incomings() {
        let userId = localStorage.getItem("userId");

        // setLoading(true)
        // await ApiService.transctions(userId)
        //     .then((data) => {
        //         setIncoming(data.filter((e) => e.type !== "Outgoing"));
        //         setTransction(data);
        //         // dispatch(getTransactions(data))

        //         setLoading(false);
        //         // console.log(data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    // console.log(transction);
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
                const datesKey = `${month}  ${year}`
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
        }
    }, [transction]);
    useEffect(() => {
        setTimeout(() => {
            // getCard();
            Incomings()
        }, 90);
    }, []);


    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [filters, setFilters] = useState()
    useEffect(() => {
        if (d) {
            const filtr = d.filter((e) => {
                let month = moment(e.date).format("M");
                month = Number(month)
                return month === selectedMonth
            })
            setFilters(filtr);
        }
    }, [d, selectedMonth])


    // paginate
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    // console.log(filters);
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
                                <span className={`${style.amout}`}>$ {totals.toLocaleString('en-US')}</span>
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
                    <div className={`flex w-full`}>
                        {/* //! bottom */}
                        {/* <div className="card">

                        </div> */}

                        <div className={`col-8`}>
                            <select value={selectedMonth} onChange={(e) => {
                                setSelectedMonth(Number(e.target.value))

                            }} name="" id="">
                                <option value="1">yanvar</option>
                                <option value="2">fevral</option>
                                <option value="3">mart</option>
                                <option value="4">aprel</option>
                                <option value="5">may</option>
                                <option value="6">iyun</option>
                                <option value="7">iyul</option>
                            </select>
                            {filters && filters.map((e, i) => (

                                <DataTable
                                    key={i}
                                    value={e.transctions}
                                    sortmode="multiple"
                                    // tableStyle={{ minWidth: '35rem', maxWidth: '35rem' }}
                                    first={first} rows={rows}
                                    paginator
                                    paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
                                    onPage={(e) => onPageChange(e)}>
                                    <Column field="date" body={(rowData) => format(new Date(rowData.date), 'MMMM dd, yyyy HH:mm:ss')} header="Date" sortable></Column>
                                    <Column field="amount" header="Amount" sortable></Column>
                                    <Column field="type" header="Type" sortable></Column>
                                    <Column field="date" header="Transaction Details" sortable body={(rowData) => (
                                        <React.Fragment>
                                            <div>{rowData.type}</div>
                                            <div>{format(new Date(rowData.date), 'MMMM dd, yyyy HH:mm:ss')}</div>
                                        </React.Fragment>
                                    )}></Column>
                                </DataTable>

                            ))}
                        </div>
                        <div style={{ color: "white" }}>
                            <h2>Account summary</h2>
                            <div>
                                <div>
                                    <p>Incomne</p>
                                    <span>$27,289</span>
                                </div>
                                <div>
                                    <p>Incomne</p>
                                    <span>$27,289</span>
                                </div>
                            </div>

                            <DoughnutChartDemo filter={filters}></DoughnutChartDemo>

                        </div>
                    </div>
                </section>
            )
            }
        </main >
    );
}
