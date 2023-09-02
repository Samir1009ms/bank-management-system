import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import 'moment/locale/az'

export default function Transactions({ selectData }) {
    const lang = localStorage.getItem("lang")
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [selected, setSelected] = useState("All")
    const [selectDatas, setSelectDatas] = useState([])
    const [filters, setFilters] = useState()

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    useEffect(() => {
        if (selectData.length > 0) {
            const filtr = selectData.filter((e) => {
                let month = moment().month(e.date).format("M");
                month = Number(month)
                return month === selectedMonth
            })
            setFilters(filtr);

            if (selected === "All") {
                const allData = filtr.flatMap((e) => e.transactions)
                setSelectDatas(allData)
            } else if (selected === "Incomings") {
                let incomeData = filtr.flatMap((e) => e.transactions)
                incomeData = incomeData.filter((e) => e.type === "Incoming");
                setSelectDatas(incomeData);

            } else if (selected === "Outcomings") {
                let outcomeData = filtr.flatMap((e) => e.transactions)
                outcomeData = outcomeData.filter((e) => e.type === "Outgoing");
                setSelectDatas(outcomeData);
            }
        } else {
            setSelectDatas([])
        }
    }, [selectData, selectedMonth, selected])
    const { t } = useTranslation();
    return (
        <div style={{ width: '50%' }}>
            < DataTable
                value={selectDatas}
                sortmode="multiple"
                first={first} rows={rows}
                paginator={selectDatas && selectDatas.length > 5}
                paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
                onPage={(e) => onPageChange(e)}
            >
                {/*//! locale en az dinamik yazmaq  */}
                <Column field="date" body={(rowData) => rowData && moment((rowData.date)).locale(lang).format('MMMM DD, yyyy HH:mm:ss')} header={t('Date')} sortable></Column>
                <Column field="amount" header={t('Amount')} sortable></Column>
                <Column field="type" header={t('Type')} body={(ty) => (ty && ty.date) && ty.type === "Incoming" ? t('incom') : t('outcom')} sortable></Column>
                <Column field="date" header={t('CardNumber')} body={(rowData) => (
                    <>
                        <div>
                            {rowData && rowData.cardNumber && rowData.cardNumber.length >= 16 && (
                                rowData.cardNumber.slice(0, 4) + " ** " + rowData.cardNumber.slice(12)
                            )}
                        </div>
                    </>
                )}></Column>
            </DataTable >

        </div >
    )
}
