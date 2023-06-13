import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'moment/locale/az'
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';
import style from './design/style.module.scss'
import { useTranslation } from 'react-i18next';
import { BiSearch } from 'react-icons/bi';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';


export default function Transaction() {
    const d = useSelector((state) => state.transactionsSlice.outcoming)
    console.log(d);
    const lang = localStorage.getItem("lang")

    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [filters, setFilters] = useState()
    const [selected, setSelected] = useState("All")
    const [selectData, setSelectData] = useState([])
    useEffect(() => {
        const filtr = d.filter((e) => {
            let month = moment().month(e.date).format("M")
            month = Number(month)
            return month === selectedMonth
        })
        setFilters(filtr)
        if (selected === "All") {
            const allData = filtr.flatMap((e) => e.transctions)
            setSelectData(allData)
        } else if (selected === "Incomings") {
            let incomeData = filtr.flatMap((e) => e.transctions)
            incomeData = incomeData.filter((e) => e.type === "Incoming");
            setSelectData(incomeData);
        } else if (selected === "Outcomings") {
            let outcomeData = filtr.flatMap((e) => e.transctions)
            outcomeData = outcomeData.filter((e) => e.type === "Outgoing");
            setSelectData(outcomeData);
        }
    }, [d, selectedMonth, selected])

    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    function select(e) {
        setSelected(e)
    }
    const [activeRow, setActiveRow] = useState(null);
    const handleRowClick = (rowData) => {
        setActiveRow(activeRow === rowData ? null : rowData);
    };
    return (
        <section style={{ backgroundColor: "GrayText", borderRadius: '10px', padding: "30px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h4>Transfer History</h4>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                            <BiSearch style={{ fontSize: "22px", marginBottom: "-4px" }} />
                        </div>
                        <div onClick={() => setIsOpen(!isOpen)} className={style.selectedMonth}>
                            <span>
                                <BsFillCalendarWeekFill />
                                {(t('month', { returnObjects: true })[selectedMonth - 1])}
                                <FiChevronDown />
                            </span>
                            {isOpen && <div className={style.setMonth}>
                                {t('month', { returnObjects: true }).map((e, i) => (
                                    <span onClick={() => { setSelectedMonth(Number(i + 1)) }} key={i}>{e}</span>
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>
                <DataTable
                    value={selectData}
                    sortmode="multiple"
                    first={first} rows={rows}
                    paginator={selectData.length > 5}
                    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                    onPage={(e) => onPageChange(e)}
                >
                    {/*//! locale en az dinamik yazmaq  */}
                    <Column
                        field="date"
                        body={(rowData) => (
                            <p style={{ display: "flex", flexDirection: 'column' }}>
                                <span>
                                    Transfer Money
                                </span>
                                <span>
                                </span>
                            </p>
                        )}
                        header="Business"
                    // sortable
                    ></Column>
                    <Column
                        field="date"
                        body={(rowData) => (
                            <p style={{ display: "flex", flexDirection: 'column' }}>
                                <span>
                                    {moment((rowData.date)).locale(lang).format('DD MMMM yyyy')}
                                </span>
                                <span>
                                    {moment((rowData.date)).locale(lang).format('HH:mm:ss')}
                                </span>
                            </p>
                        )}
                        header="Date/Time"
                    // sortable
                    ></Column>
                    <Column
                        field="amount"
                        header="Amount"
                        style={{ color: "#3a8ffd" }}
                    // sortable
                    ></Column>
                    <Column
                        field="type"
                        header="Type"
                        body={(ty) => ty.type === "Incoming" ? "Income" : "Outcome"}
                    // sortable
                    ></Column>
                    <Column
                        field="date"
                        header="Card Number"
                        style={{ width: '12%' }}
                        body={(rowData) => (
                            <>
                                <div>{rowData.cardNumber.slice(0, 4) + " ** " + rowData.cardNumber.slice(12)}</div>
                            </>
                        )}></Column>
                    <Column
                        style={{ width: "10px " }}
                        body={(rowData) => (
                            <div style={{ position: "relative" }}>
                                <IoEllipsisVerticalSharp onClick={() => handleRowClick(rowData)} style={{ cursor: 'pointer' }} />
                                {activeRow === rowData && (
                                    <div style={{ position: 'absolute', left: '-67px', bottom: '-18px', width: '90px', background: 'white', color: 'black', borderRadius: "10px", padding: '10px 5px' }}>
                                        <span onClick={() => console.log(rowData)} style={{ cursor: "pointer", fontSize: "11px", display: "flex", alignItems: 'center', columnGap: "6px" }}>
                                            <AiOutlineInfoCircle /> view details
                                        </span>
                                        <span onClick={() => handleRowClick(false)} style={{ cursor: "pointer", display: "flex", alignItems: 'center', columnGap: "6px" }}>
                                            <ImCancelCircle />  cancel
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}></Column>
                </DataTable>
            </div>
        </section>
    )
}
