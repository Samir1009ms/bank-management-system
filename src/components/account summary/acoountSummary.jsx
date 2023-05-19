import React, { useEffect, useState } from "react";
import DoughnutChartDemo from "../../components/charts/chart2";
import moment from "moment/moment";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format } from 'date-fns';



export function AccountSummary({ tarix }) {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [filters, setFilters] = useState()
    useEffect(() => {
        if (tarix) {
            const filtr = tarix && tarix.filter((e) => {
                let month = moment(e.date).format("M");
                month = Number(month)
                return month === selectedMonth
            })
            setFilters(filtr);
        }
    }, [selectedMonth, tarix])


    return (
        <div className={`flex w-full`}>
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
    )
}