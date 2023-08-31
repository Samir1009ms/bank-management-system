import React, { useState } from 'react'
import style from "./design/style.module.scss";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function AddCart() {

    const { t } = useTranslation();

    const [card, setCard] = useState({
        cardNumber: '',
        cardDate: '',
        cardCvv: '',
        cardName: '',
        cardType: '',
    });

    const getCardType = (cardNumber) => {
        const visaPattern = /^4/;
        const mastercardPattern = /^5/;
        const amexPattern = /^3[47]/;

        if (cardNumber.match(visaPattern)) {
            return 'Visa';

        } else if (cardNumber.match(mastercardPattern)) {
            return 'Master';

        } else if (cardNumber.match(amexPattern)) {
            return 'Amex';

        } else {
            return 'Unknown';
        }
    };

    const [formValid, setFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "cardNumber" && value.length >= 16) {
            const cardType = getCardType(value);
            setCard({ ...card, cardNumber: value, cardType: cardType });
        } else {
            setCard({ ...card, [name]: value });
        }

        const isFormValid = (
            card.cardNumber.trim() !== '' &&
            card.cardDate.trim() !== '' &&
            card.cardCvv.trim() !== '' &&
            card.cardName.trim() !== ''
        );
        setFormValid(isFormValid);
    };

    async function handleTransferPost() {
        const userId = localStorage.getItem("userId");
        const BASE_URL = 'http://localhost:5500/api'
        await axios.post(`${BASE_URL}/addBankCard/${userId}`, {
            cardNumber: card.cardNumber,
            cardDate: card.cardDate,
            cardCvv: card.cardCvv,
            cardName: card.cardName,
            cardType: card.cardType,

        }).then((res) => {
            console.log(res);
            setCard({
                cardNumber: '',
                cardDate: '',
                cardCvv: '',
                cardName: '',
                cardType: '',
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <section className={style.AddCart}>
            <div className={style.container}>
                <div className={style.top}>
                    <div className={style.transferCont}>
                        <span className={style.numberText}>{t('cardNumber')}</span>
                        <input placeholder="4169741394701443" maxLength={16} minLength={16} className={style.transferInput} type="number" name="cardNumber" value={card.cardNumber} onChange={handleChange} id="z" />
                    </div>
                </div>
                <div className={style.cards}>
                    <div className={style.top}>
                        <div className={style.transferCont}>
                            <span className={style.numberText}>{t('cardDate')}</span>
                            <input placeholder="10/23" className={style.transferInput} type="date" name="cardDate" value={card.cardDate} onChange={handleChange} id="x" />
                        </div>
                    </div>
                    <div className={style.top}>
                        <div className={style.transferCont}>
                            <span className={style.numberText}>{t('cardCvv')}</span>
                            <input placeholder="123" className={style.transferInput} maxLength={3} minLength={3} type="number" name="cardCvv" value={card.cardCvv} onChange={handleChange} id="c" />
                        </div>
                    </div>
                </div>
                <div className={style.top}>
                    <div className={style.transferCont}>
                        <span className={style.numberText}>{t('cardHolder')}</span>
                        <input placeholder="Samir Yusifov" className={style.transferInput} minLength={4} type="text" name="cardName" value={card.cardName} onChange={handleChange} id="v" />
                    </div>
                </div>
                <div className={style.transferButton}>
                    <div className={style.transferBtnContainer}>
                        <button disabled={!formValid} onClick={handleTransferPost} className={style.transferBtn}>
                            {t('addCard')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}