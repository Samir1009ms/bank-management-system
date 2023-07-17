import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import style from "./design/transactions.module.scss"
import 'moment/locale/az'
import { useTranslation } from "react-i18next";
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import { AccountSummary } from "../account summary/acoountSummary";

function Transaction({ dataGroup }) {

    const lang = localStorage.getItem("lang")
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1));
    const [selected, setSelected] = useState("All")
    const [selectData, setSelectData] = useState([])
    const [filters, setFilters] = useState()

    useEffect(() => {
        if (dataGroup) {
            const filtr = dataGroup.filter((e) => {
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
    }, [selectedMonth, selected, dataGroup])

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    function select(e) {
        setSelected(e)
    }

    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`flex w-full gap-3 mt-6 p-6 pt-0 ${style.transactions}`}>
            <h2 className={`${style.basliq}`}>{t('transactions')}</h2>
            <div className={`flex column-gap-3 ${style.table}`}>
                <div className={`col-9 ${style.dataTable}`}>
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
                        <Column field="date" body={(rowData) => moment((rowData.date)).locale(lang).format('MMMM DD, yyyy HH:mm:ss')} header={t('Date')} sortable></Column>
                        <Column field="amount" header={t('Amount')} sortable></Column>
                        <Column field="type" header={t('Type')} body={(ty) => ty.type === "Incoming" ? t('incom') : t('outcom')} sortable></Column>
                        <Column field="date" header={t('CardNumber')} body={(rowData) => (
                            <>
                                <div>{rowData.cardNumber.slice(0, 4) + " ** " + rowData.cardNumber.slice(12)}</div>
                            </>
                        )}></Column>
                    </DataTable>
                </div>
                <div style={{ marginTop: "-45px", width: '100%' }}>
                    <AccountSummary filter={filters} />
                </div>
            </div>
        </div>
    )
}

export default (Transaction)