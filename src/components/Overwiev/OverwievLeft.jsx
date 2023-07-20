import React from 'react'
import style from './design/style.module.scss'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function OverwievLeft() {
    const total = useSelector((state) => state.card.total);
    const loading = useSelector((state) => state.transactionsSlice.loading);
    const { t } = useTranslation()

    return (
        <div className={`${style.balansCont} p-3  col-4`}>
            <div className={`${style.balans}  `}>
                {/* //! total balans */}
                <span className={`${style.total}`}>{t('balance')}</span>
                <span className={`${style.amout}`}>$ {total.toLocaleString('en-US')}</span>

            </div>
            <div className={`${style.balans}`}>
                {/* //! credit limit */}
                <span className={`${style.total}`}>{t('credit')}</span>
                <span className={`${style.limit}`}>$ 1,743</span>
            </div>
            <button className={`${style.paymentBtn}`}>{t('payment')}</button>
        </div>
    )
}