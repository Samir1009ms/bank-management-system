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
            getCard();
        }, 90);
    }, []);

    // const columns = [
    //     {
    //         field: 'date',

    //         body: (rowData) => format(new Date(rowData.date), 'MMMM dd, yyyy'),

    //     },
    //     {
    //         field: 'amount',
    //     },
    //     {
    //         field: 'type',
    //     },
    //     {
    //         field: 'type',
    //     },
    //     {
    //         field: '',
    //     }
    // ];


    // month sort

    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [filters, setFilters] = useState()
    useEffect(() => {
        if (tarix) {
            const filtr = tarix && tarix.filter((e) => {
                let month = moment(e.date).format("M");
                // console.log(month);
                month = Number(month)
                return month === selectedMonth
            })
            setFilters(filtr);
        }
        console.log(selectedMonth);
        // console.log(filters[selectedMonth]);
    }, [selectedMonth, tarix])


    // paginate
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

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
                        </div>
                    </div>
                    <div>
                        {/* //! bottom */}
                        <div className="card">

                        </div>

                        <div style={{ maxWidth: '35rem' }}>
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

                                <DataTable key={i} value={e.transctions} sortmode="multiple" tableStyle={{ minWidth: '35rem', maxWidth: '35rem' }} first={first} rows={rows} paginator paginatorTemplate=" PrevPageLink PageLinks NextPageLink " onPage={(e) => onPageChange(e)}>
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

                        <div>{/* //! account summary */}</div>
                    </div>
                </section>
            )
            }
        </main >
    );
}
