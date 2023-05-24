import React from "react";
import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import DoughnutChartDemo from "../charts/chart2";
import { AccountSummary } from "../account summary/acoountSummary";



export function Transaction() {
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [filters, setFilters] = useState()
    const d = useSelector((state) => state.transactionsSlice.outcoming)

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


    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <>
            <div className={`col-8`}>
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
                        <Column field="type" header="Type" body={(ty) => ty.type === "Incoming" ? "Income" : "Outcome"} sortable></Column>
                        <Column field="date" header="Transaction Details" sortable body={(rowData) => (
                            <React.Fragment>
                                <div>{rowData.type}</div>
                                <div>{format(new Date(rowData.date), 'MMMM dd, yyyy HH:mm:ss')}</div>
                            </React.Fragment>
                        )}></Column>
                    </DataTable>

                ))}
            </div>
            <AccountSummary filter={filters}></AccountSummary>
        </>
    )
}