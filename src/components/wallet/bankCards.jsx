import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import style from './design/bankCards.module.scss';
import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './design/swiper.scss'
import './design/style.module.scss'

export function BankCard({ getCardData }) {
    let cardData = useSelector((state) => state.card.cards);

    const [state, setState] = useState({
        number: '0000000000000000',
        expiry: '00/00',
        cvc: '000',
        name: 'NO NAME',
        focus: 'TRUE',
    });

    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(Math.floor((cardData.length - 1) / 2));
    const slideChangeHandler = (swiper) => {
        setCurrentIndex(swiper.activeIndex);
    };

    const [group, setGroup] = useState([])
    useEffect(() => {
        if (cardData.length > 0) {
            getCardData(cardData[currentIndex] && cardData[currentIndex].cardNumber);
        }
    }, [currentIndex, cardData])

    return (
        <div className={style.BankCard}>
            {cardData.length > 0 && <div className={style.cardSlider}>
                <Swiper
                    effect="cards"
                    grabCursor={true}
                    modules={[EffectCards]}
                    onSwiper={(swiper) => {
                        swiper.slideTo(Math.floor((cardData.length - 1) / 2));
                        slideChangeHandler(swiper);
                    }}
                    onSlideChange={slideChangeHandler}
                    className='mySwiper'
                >
                    {cardData.map((e, i) => (
                        <SwiperSlide key={i}>
                            <div
                                key={e.cardNumber}
                                className={`${style.cardsContainer}  ${currentIndex === i ? style.active : ''}`}
                            >
                                <Cards
                                    number={`${e.cardNumber.slice(0, 4)} **** **** ${e.cardNumber.slice(12)}` || state.number}
                                    expiry={e.cardDate || state.expiry}
                                    cvc={e.cardCvv || state.cvc}
                                    name={e.cardName || state.name}
                                />
                                <div className={style.total}>
                                    <small className={style.balansText}>{t('current')}</small>
                                    <p className={style.price}>$ {cardData ? e.balance.toLocaleString('en-US') : 0}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>}
        </div>
    );
}
