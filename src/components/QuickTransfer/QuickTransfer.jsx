import React, { memo, useEffect, useRef, useState } from 'react'
import style from "./design/style.module.scss";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FiChevronDown } from 'react-icons/fi';
import { RadioButton } from 'primereact/radiobutton';
import { useTranslation } from 'react-i18next';
import { Toast } from 'primereact/toast';

function QuickTransfer() {
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Success', life: 3000 });
    }
    const showError = (e) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: `${e}`, life: 3000 });
    }
    const loading = useSelector((state) => state.card.loading);
    let cardData = useSelector((state) => state.card.cards);
    const [ingredient, setIngredient] = useState(0)
    const [cardActive, setCardActive] = useState(ingredient)
    const [designs, setDesigns] = useState("hidden")

    function handleActive(i) {
        setIngredient(i)
        setDesigns("hidden")
        setCardActive(i)
    }

    function handleDesign() {
        if (designs === "hidden") {
            setDesigns("flex")
        } else {
            setDesigns("hidden")
        }
    }

    const [tra, setTra] = useState({
        senderCardNumber: '',
        receiverCardNumber: '',
        amount: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = parseFloat(value);
        setTra((prevTra) => ({
            ...prevTra,
            [name]: name === "amount" ? (isNaN(parsedValue) || parsedValue === 0) ? null : parsedValue : value,
        }));
    };

    useEffect(() => {
        if (cardData) {
            if (cardData[cardActive]) {
                setTra((data) => ({
                    ...data,
                    senderCardNumber: cardData[cardActive].cardNumber
                }))
            }
        }
    }, [cardActive, cardData])

    function handleTransferPost() {
        const BASE_URL = 'http://localhost:5500/api'
        axios.post(`${BASE_URL}/transferMoney`, {
            senderCardNumber: tra.senderCardNumber,
            receiverCardNumber: tra.receiverCardNumber,
            amount: tra.amount
        }).then((res) => {
            console.log(res.data);
            showSuccess()
            setTra({
                senderCardNumber: '',
                receiverCardNumber: '',
                amount: ''
            })
        }).catch((err) => {
            console.log(err);
            showError(err.response.data.message)
        }
        )
    }
    const { t } = useTranslation()
    return (
        loading ? "" : <div className={`${style.transfer}`}>
            <h3 className={`${style.textW}`}>{t('quickT')}</h3>
            <Toast ref={toast} />
            <div className={style.transferContainer}>
                <div className={style.top}>
                    <div className={style.transferCont}>
                        <span className={style.numberText}>{t('cardN')}</span>
                        <input placeholder="4169741394701443" minLength={16} maxLength={16} className={style.transferInput} type="number" name="receiverCardNumber" value={tra.receiverCardNumber} onChange={handleChange} id="" />
                    </div>
                </div>
                <div className={style.bottom} >
                    <div onClick={() => handleDesign()} className={style.debit}>
                        <div className={style.debitCards}>
                            <div className={style.cardLeft}>
                                {cardData ?
                                    <>
                                        <span className={style.cardDesign}>
                                            <span className={style.cardType}>{cardData[cardActive] ? cardData[cardActive].cardType : ''}</span>
                                            <span className={style.cardNumber}> {cardData[cardActive] && cardData[cardActive].cardNumber.slice(12).replace("", "**")}</span>
                                        </span>
                                        <span className={style.cardText}>
                                            <span>{t('debitC')}</span>
                                            $ {(cardData[cardActive] ? (cardData[cardActive].balance) : "0000").toLocaleString("en-US")}
                                        </span>
                                    </>
                                    : <>
                                        <span className={style.cardDesign}>
                                            <span className={style.cardType}>Type</span>
                                            <span className={style.cardNumber}>** 1111</span>
                                        </span>
                                        <span className={style.cardText}>
                                            <span>{t('debitC')}</span>
                                            &00
                                        </span>
                                    </>}
                            </div>
                            <div>
                                <FiChevronDown />
                            </div>
                        </div>
                        <div className={`${style.debitDropDown} ${designs}`}>
                            {
                                cardData ? cardData.map((e, i) => (
                                    <div id="x" className={`${style.bankCardCont}`} onClick={() => handleActive(i)} key={i}>
                                        <div className={style.cardLeft}>
                                            <span className={style.cardDesign}>
                                                <span className={style.cardType}>{e.cardType}</span>
                                                <span className={style.cardNumber}> {e.cardNumber.slice(12).replace("", "**")}</span>
                                            </span>
                                            <span className={style.cardText}>
                                                <span>{t('debitC')}</span>
                                                $ {(e.balance ? e.balance : "0000").toLocaleString("en-US")}
                                            </span>
                                        </div>
                                        <div className="flex align-items-center">
                                            <RadioButton inputId="x" name="pizza" value="card" className={style.radio} onChange={(e) => setIngredient(i)} checked={ingredient === i} />
                                        </div>
                                    </div>
                                )) : null
                            }
                        </div>
                    </div>
                </div>
                <div className={style.amount}>
                    <div className={style.amountCont}>
                        <span className={style.amountText}>{t('amount')}</span>
                        <div className={style.moneyCont}>
                            <input className={style.amountInput} placeholder="0.00" onChange={handleChange} value={(tra.amount || "")} name="amount" type="number" step="0.01" />
                            <span className={style.usd}>$</span>
                        </div>
                    </div>
                </div>
                <div className={style.transferButton}>
                    <div className={style.transferBtnContainer}>
                        <button onClick={handleTransferPost} className={style.transferBtn}>
                            {t('sendM')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(QuickTransfer)