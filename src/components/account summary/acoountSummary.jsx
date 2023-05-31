import React, { useEffect, useState } from "react";
// ! charts
import DoughnutChartDemo from "../../components/charts/chart2";
// ! icons
import { HiArrowTrendingUp } from 'react-icons/hi2'
import { HiOutlineArrowTrendingDown } from 'react-icons/hi2'
// ! style
import style from "./design/style.module.css"

export function AccountSummary({ filter }) {
    const [incomes, setIncomes] = useState(0)
    const [outgomings, setOutgomings] = useState(0)
    useEffect(() => {
        const arr = filter && filter.flatMap((e) => e.transctions)
        const outcomne = arr && arr.filter((e) => e.type !== "Incoming")
        const incomne = arr && arr.filter((e) => e.type !== "Outgoing")
        setOutgomings(outcomne && outcomne.reduce((acc, amount) => (acc + amount.amount), 0))
        setIncomes(incomne && incomne.reduce((acc, amount) => (acc + amount.amount), 0))
    }, [filter])
    return (
        <div className={`grid col-4 row-gap-1 ${style.accSum}`}>
            <div className={`${style.summary}`}>
                <h2 className={`col-12 ${style.text}`}>Account summary</h2>
                <div className={`${style.xerc} w-full flex column-gap-2`}>
                    <div className={`w-6 ${style.incomme}`}>
                        <p> <HiArrowTrendingUp /> Incomne</p>
                        <span> +${incomes && (incomes.toLocaleString("en-US"))}</span>
                    </div>
                    <div className={`w-6 ${style.incomme}`}>
                        <p>
                            <HiOutlineArrowTrendingDown
                                className={`${style.down}`}
                            />
                            Outcomne</p>
                        <span>-${(outgomings && (outgomings * -1).toLocaleString('en-US'))}</span>
                    </div>
                </div>
            </div>
            <DoughnutChartDemo incom={incomes} outcom={outgomings}></DoughnutChartDemo>
        </div>

    )
}