import React from "react";
import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import DoughnutChartDemo from "../charts/chart2";
import { AccountSummary } from "../account summary/acoountSummary";

import style from "./design/style.module.css"
import { values } from "lodash";

import { Dropdown } from 'primereact/dropdown';

export function Transaction() {
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [filters, setFilters] = useState()
    const d = useSelector((state) => state.transactionsSlice.outcoming)
    // console.log(d);
    // const [selectedCity, setSelectedCity] = useState((new Date().getMonth() + 1));
    // const cities = [
    //     { name: 'Yanvar', code: 1 },
    //     { name: 'Fevral', code: 2 },
    //     { name: 'Mart', code: 3 },
    //     { name: 'Aprel', code: 4 },
    //     { name: 'May', code: 5 },
    //     { name: 'Iyun', code: 6 },
    //     { name: 'Iyul', code: 7 },
    //     { name: 'Avqust', code: 8 },
    //     { name: 'Sentybar', code: 9 },
    //     { name: 'Oktyabr', code: 10 },
    //     { name: 'Noyabr', code: 11 },
    //     { name: 'Dekabr', code: 12 }
    // ];
    // console.log(selectedCity);
    const [selected, setSelected] = useState("All")

    const [selectData, setSelectData] = useState([])
    useEffect(() => {
        if (d) {
            const filtr = d.filter((e) => {
                let month = moment(e.date).format("M");
                month = Number(month)
                return month === selectedMonth
            })
            setFilters(filtr);
            if (selected === "All") {
                const allData = filtr.flatMap((e) => e.transctions)
                setSelectData(allData)
                // console.log(filtr);
            } else if (selected === "Incomings") {
                // setFilters(null)

                let incomeData = filtr.flatMap((e) => e.transctions)
                // console.log(incomeData);
                incomeData = incomeData.filter((e) => e.type === "Incoming");
                // console.log(incomeData);
                setSelectData(incomeData);

            } else if (selected === "Outcomings") {
                let outcomeData = filtr.flatMap((e) => e.transctions)
                outcomeData = outcomeData.filter((e) => e.type === "Outgoing");
                // console.log(outcomeData);
                setSelectData(outcomeData);
            }
        }

    }, [d, selectedMonth, selected])


    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };


    function select(e) {
        console.log(e);
        setSelected(e)
    }


    return (
        <>
            <div className={`col-8`}>
                <div className={`${style.selects}`}>
                    <div className={`${style.selectLeft}`}>
                        <span onClick={() => select("All")} className={`${style.click} ${selected === "All" ? style.active : ""}`}>All</span>
                        <span onClick={() => select("Incomings")} className={`${style.click} ${selected === "Incomings" ? style.active : ""}`}>Incomings</span>
                        <span onClick={() => select("Outcomings")} className={`${style.click} ${selected === "Outcomings" ? style.active : ""}`}>Outcomings</span>
                    </div>
                    <select
                        value={selectedMonth}
                        onChange={(e) => { setSelectedMonth(Number(e.target.value)) }}
                        name=""
                        id=""
                    >
                        <option value="1">yanvar</option>
                        <option value="2">fevral</option>
                        <option value="3">mart</option>
                        <option value="4">aprel</option>
                        <option value="5">may</option>
                        <option value="6">iyun</option>
                        <option value="7">iyul</option>
                    </select>
                </div>
                {/* {selectData && selectData.map((e, i) => ( */}
                <DataTable
                    // key={i}
                    value={selectData}
                    sortmode="multiple"
                    // tableStyle={{ minWidth: '35rem', maxWidth: '35rem' }}
                    first={first} rows={rows}
                    paginator={selectData.length > 5}
                    paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
                    onPage={(e) => onPageChange(e)}

                >

                    <Column field="date" body={(rowData) => format(new Date(rowData.date), 'MMMM dd, yyyy HH:mm:ss')} header="Date" sortable></Column>
                    <Column field="amount" header="Amount" sortable></Column>
                    <Column field="type" header="Type" body={(ty) => ty.type === "Incoming" ? "Income" : "Outcome"} sortable></Column>
                    <Column field="date" header="Transaction Details" sortable body={(rowData) => (
                        <>
                            <div>{rowData.type}</div>
                            <div>{format(new Date(rowData.date), 'MMMM dd, yyyy HH:mm:ss')}</div>
                        </>
                    )}></Column>
                </DataTable>

                {/* ))} */}
            </div>
            <AccountSummary filter={filters}></AccountSummary>
        </>
    )
}