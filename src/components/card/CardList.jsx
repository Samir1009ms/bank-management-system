import React, { useState } from 'react'
import moment from 'moment'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import style from './design/style.module.scss'
import PieChart from '../charts/PieCharts'
import LegendDonut from '../charts/PieCharts'

export default function CardList() {
    const lang = localStorage.getItem("lang")

    let cardData = useSelector((state) => state.card.cards);
    const [state, setState] = useState({
        number: '0000000000000000',
        expiry: '00/00',
        cvc: '000',
        name: 'NO NAME',
        focus: 'TRUE',
    });
    console.log(cardData);
    const [activeRow, setActiveRow] = useState(null);
    const handleRowClick = (rowData) => {
        setActiveRow(activeRow === rowData ? null : rowData);
    };

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    return (
        <div className={style.cardListContainer} >
            <div className={style.cardListLeft}
            >
                <div className={style.cardListLeftTop}>
                    <h3>Card List</h3>
                    <span></span>
                </div>
                <div className={style.cardContent}>
                    {
                        cardData.map((e, i) => (
                            <div className={style.cardLists}>
                                <div style={{ display: 'flex', width: '100%', columnGap: '15px', alignItems: "center    " }}>
                                    <div className={style.cardDesign}>
                                        <span className={style.cardType}>{cardData ? e.cardType : "Card"}</span>
                                        <span className={style.cardNumber}> {cardData && e.cardNumber.slice(12).replace("", "**")}</span>
                                    </div>
                                    <div className={style.cardContainer}>
                                        <span>Card Type</span>
                                        <span>{e.cardType}</span>
                                    </div>
                                    <div className={style.cardContainer}>
                                        <span>Bank</span>
                                        <span>MS Bank</span>
                                    </div>
                                    <div className={style.cardContainer}>
                                        <span>Card Number</span>
                                        <span>{"**** " + e.cardNumber.slice(12)}</span>
                                    </div>
                                    <div className={style.cardContainer}>
                                        <span>Namein Card</span>
                                        <span>{e.cardName}</span>
                                    </div>
                                    <div style={{ position: "relative" }}>
                                        <IoEllipsisVerticalSharp onClick={() => handleRowClick(e)} style={{ cursor: 'pointer' }} />
                                        {activeRow === e && (
                                            <div style={{ position: 'absolute', left: '-67px', bottom: '-18px', width: '90px', background: 'var(--table-dropDown-bg)', color: 'var(--nav-text-color)', borderRadius: "10px", padding: '8px 5px' }}>
                                                <span onClick={() => console.log(e)} style={{ cursor: "pointer", fontSize: "11px", display: "flex", alignItems: 'center', columnGap: "6px", marginBottom: '6px' }}>
                                                    <AiOutlineInfoCircle /> view details
                                                </span>
                                                <span onClick={() => handleRowClick(false)} style={{ cursor: "pointer", display: "flex", alignItems: 'center', columnGap: "6px" }}>
                                                    <ImCancelCircle />  cancel
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{ background: 'green' }}>
                {/* <PieChart data={cardData} />
                 */}
                <LegendDonut data={cardData} />
            </div>
        </div >
    )
}
