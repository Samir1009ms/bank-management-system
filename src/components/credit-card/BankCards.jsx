import React, { useState } from 'react'
import Cards from 'react-credit-cards-2';
// import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { useSelector } from 'react-redux';
import style from './design/style.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function BankCards() {
    let cardData = useSelector((state) => state.card.cards);
    const [state, setState] = useState({
        number: '0000000000000000',
        expiry: '00/00',
        cvc: '000',
        name: 'NO NAME',
        focus: 'TRUE',
    });

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const getVisibleIndexes = () => {
        if (cardData && cardData.length > 0) {
            if (cardData.length <= 2) {
                return Array.from({ length: cardData.length }, (_, index) => index + 1);
            } else {
                const currentIndex = currentCardIndex + 1;
                let firstIndex;
                let lastIndex;
                if (currentIndex === cardData.length) {
                    firstIndex = Math.max(currentIndex - 3, 1);
                    lastIndex = currentIndex;
                } else if (currentIndex === cardData.length - 1) {
                    firstIndex = Math.max(currentIndex - 2, 1);
                    lastIndex = Math.min(firstIndex + 3, cardData.length);
                } else {
                    firstIndex = Math.max(currentIndex - 1, 1);
                    lastIndex = Math.min(firstIndex + 3, cardData.length);
                }

                return Array.from({ length: lastIndex - firstIndex + 1 }, (_, index) => index + firstIndex);
            }
        }
        return [];
    };
    const { t } = useTranslation()

    return (
        <div className={style.cardsTop} >
            <h3 className={`${style.textW}`}>{t('wallet')}</h3>
            <div className={style.cardSlider}>
                <div className={style.cardContainer}>
                    <AnimatePresence initial={false} custom={currentCardIndex}>
                        <motion.div
                            key={currentCardIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.7 }}
                        >
                            {<Cards
                                number={cardData ? cardData[currentCardIndex].cardNumber : state.number}
                                expiry={cardData ? cardData[currentCardIndex].cardDate : state.expiry}
                                cvc={cardData ? cardData[currentCardIndex].cardCvv : state.cvc}
                                name={cardData ? cardData[currentCardIndex].cardName : state.name}
                            >
                            </Cards>}
                            <div className={style.blur}>
                            </div>
                            <div className={style.total}>
                                <small className={style.balansText}>{t('current')}</small>
                                <p className={style.price}>$ {cardData ? (cardData[currentCardIndex].balance).toLocaleString('en-US') : 0}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className={style.pagination}>
                    {getVisibleIndexes().map((index) => (
                        <span
                            key={index}
                            className={currentCardIndex === index - 1 ? style.active : ''}
                            onClick={() => setCurrentCardIndex(index - 1)}
                        >
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
