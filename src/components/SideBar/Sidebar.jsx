import React from 'react'
import style from "./design/style.module.scss";
import BankCards from '../credit-card/BankCards';
import QuickTransfer from '../QuickTransfer/QuickTransfer';

export default function Sidebar() {
    return (
        <section className={`pt-2  ${style.left} `}>
            <div className={`grid  row-gap-6  justify-content-center m-0`} style={{ width: "100%", color: "white" }}>
                <BankCards />
                <QuickTransfer />
            </div>
        </section>
    )
}
