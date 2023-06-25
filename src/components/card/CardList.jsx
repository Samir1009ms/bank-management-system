import React, { useState } from 'react'
import moment from 'moment'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { AiFillPlusCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import style from './design/style.module.scss'
import PieChart from '../charts/PieCharts'
import LegendDonut from '../charts/PieCharts'
import { useTranslation } from 'react-i18next'

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
    console.log('sa');
    console.log(cardData);
    console.log('dsds');
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

    const { t } = useTranslation()
    return (
        <div className={style.cardListContainer} >
            <div className={style.cardListLeft}
            >
                <div className={style.cardListLeftTop}>
                    <h3>{t('cardList')}</h3>
                    {/* <div style={{ width: "20%", height: '50px', borderRadius: "22px", background: "var( --btn-bg-color)", display: "flex", alignItems: 'center', columnGap: "6px", padding: "5px 10px", cursor: "pointer    " }}>
                        <AiFillPlusCircle style={{ fontSize: "33px" }} />
                        <p>Add Card</p>
                    </div> */}
                </div>
                <div className={style.cardContent}>
                    {
                        cardData.map((e, i) => (
                            <div key={e._id} className={style.cardLists}>
                                <div className={style.cardListCont} >
                                    <div className={style.cardDesign}>
                                        <span className={style.cardType}>{cardData ? e.cardType : "Card"}</span>
                                        <span className={style.cardNumber}> {cardData && e.cardNumber.slice(12).replace("", "**")}</span>
                                    </div>
                                    <div className={style.cardContainer}>
                                        <span>{t('cardType')}</span>
                                        <span>{e.cardType}</span>
                                    </div>
                                    <div className={style.cardContainer}>
                                        <span>Bank</span>
                                        <span>MS Bank</span>
                                    </div>
                                    <div className={style.cardContainer}>
                                        <span>{t('cardNumber')}</span>
                                        <span>{"**** " + e.cardNumber.slice(12)}</span>
                                    </div>
                                    <div className={style.cardContainer}>
                                        <span>{t('cardHolder')}</span>
                                        <span>{(e.cardName)}</span>
                                    </div>
                                    <div className={style.cardListContModal} >
                                        <IoEllipsisVerticalSharp onClick={() => handleRowClick(e)} style={{ cursor: 'pointer' }} />
                                        {activeRow === e && (
                                            <div className={style.modalContainer}
                                            >
                                                <span className={style.modalTop} onClick={() => console.log(e)} >
                                                    <AiOutlineInfoCircle /> view details
                                                </span>
                                                <span className={style.modalBottom} onClick={() => handleRowClick(false)} >
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
            <div className={style.cardListRigth}>
                <LegendDonut data={cardData} />
            </div>
        </div >
    )
}
