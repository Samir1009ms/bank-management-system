import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountSummary } from "../account summary/acoountSummary";
import style from "./design/style.module.scss"
import 'moment/locale/az'
import { useTranslation } from "react-i18next";
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
function Transaction() {
    const lang = localStorage.getItem("lang")
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [filters, setFilters] = useState()
    const d = useSelector((state) => state.transactionsSlice.outcoming)
    const [selected, setSelected] = useState("All")
    const [selectData, setSelectData] = useState([])
    console.log("sss");
    useEffect(() => {
        if (d) {
            const filtr = d.filter((e) => {
                let month = moment().month(e.date).format("M");
                month = Number(month)
                return month === selectedMonth
            })
            setFilters(filtr);
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
        }
    }, [d, selectedMonth, selected])
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    function select(e) {
        setSelected(e)
    }
    console.log(lang);
    const { t } = useTranslation();
    console.log(moment().locale(lang).months(t('month', { returnObjects: true })[selectedMonth]).format("M"));
    console.log(t('month', { returnObjects: true })[1]);

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`flex w-full gap-3 mt-6 ${style.transactions}`}>
            <h2 className={`${style.basliq}`}>{t('transactions')}</h2>
            <div className={`flex column-gap-3 ${style.table}`}>
                <div className={`col-8`}>
                    <div className={`${style.selects}`}>
                        <div className={`${style.selectLeft}`}>
                            <span onClick={() => select("All")} className={`${style.click} ${selected === "All" ? style.active : ""}`}>{t('all')}</span>
                            <span onClick={() => select("Incomings")} className={`${style.click} ${selected === "Incomings" ? style.active : ""}`}>{t('incom')}</span>
                            <span onClick={() => select("Outcomings")} className={`${style.click} ${selected === "Outcomings" ? style.active : ""}`}>{t('outcom')}</span>
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
                    <DataTable
                        value={selectData}
                        sortmode="multiple"
                        first={first} rows={rows}
                        paginator={selectData.length > 5}
                        paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
                        onPage={(e) => onPageChange(e)}
                    >
                        {/*//! locale en az dinamik yazmaq  */}
                        <Column field="date" body={(rowData) => moment((rowData.date)).locale(lang).format('MMMM DD, yyyy HH:mm:ss')} header="Date" sortable></Column>
                        <Column field="amount" header="Amount" sortable></Column>
                        <Column field="type" header="Type" body={(ty) => ty.type === "Incoming" ? "Income" : "Outcome"} sortable></Column>
                        <Column field="date" header="Transaction Details" sortable body={(rowData) => (
                            <>
                                <div>{rowData.type}</div>
                                <div>{moment((rowData.date)).format('MMMM DD, yyyy HH:mm:ss')}</div>
                            </>
                        )}></Column>
                    </DataTable>
                </div>
                <AccountSummary filter={filters}></AccountSummary>
            </div>
        </div>
    )
}

export default (Transaction)