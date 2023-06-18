import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useSelector } from 'react-redux';
import style from './design/style.module.scss';
import { useTranslation } from 'react-i18next';

export default function CardCenter() {
    let cardData = useSelector((state) => state.card.cards);
    const [state, setState] = useState({
        number: '0000000000000000',
        expiry: '00/00',
        cvc: '000',
        name: 'NO NAME',
        focus: 'TRUE',
    });

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleClick = (index) => {
        setCurrentCardIndex(index);
        // console.log(8 % 6);
    };

    const next = () => {
        setCurrentCardIndex((prev) => (prev + 1) % cardData.length);
    };

    const previous = () => {
        setCurrentCardIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
    };

    const { t } = useTranslation();

    return (
        <section>
            <div className={style.cardsTop}>
                <h3 className={`${style.textW}`}>Card Center</h3>
                <div className={style.cardSlider}>
                    {/* <p onClick={previous}>X</p> */}
                    <div className={style.cardContainer}>
                        {cardData &&
                            cardData.map((e, i) => (
                                <div
                                    key={e.cardNumber}
                                    className={`${style.cardsContainer} cards ${currentCardIndex === i ? style.active : ''}`}
                                    onClick={() => handleClick(i)}
                                    style={{
                                        transform: `translateX(${((i - currentCardIndex + cardData.length) % cardData.length) * 100}%)${currentCardIndex === i ? 'scale(1.1)' : ''
                                            }`,
                                    }}

                                >
                                    {console.log((((i - currentCardIndex + cardData.length) % cardData.length)), ((i - currentCardIndex + cardData.length)))}
                                    <Cards
                                        number={`${e.cardNumber.slice(0, 4)} **** **** ${e.cardNumber.slice(12)}` || state.number}
                                        expiry={e.cardDate || state.expiry}
                                        cvc={e.cardCvv || state.cvc}
                                        name={e.cardName || state.name}
                                    />
                                    <div className={style.total}>
                                        <small className={style.balansText}>{t('current')}</small>
                                        {/* <p>{i}</p> */}
                                        <p className={style.price}>$ {cardData ? e.balance.toLocaleString('en-US') : 0}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* <p onClick={next}>XX</p> */}
                </div>
            </div>
        </section>
    );
}
