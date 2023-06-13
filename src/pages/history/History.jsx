import React, { useEffect } from 'react'
import Transaction from '../../components/history/Transaction'
import Payment from '../../components/history/Payment'
import { useDispatch } from 'react-redux'
import { getTransactions } from '../../store/asyncthunk/transactions-service'
import QuickTransfer from '../../components/QuickTransfer/QuickTransfer'
import Sidebar from '../../components/SideBar/Sidebar'

export default function History() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTransactions())
        console.log("s");
    }, [dispatch])
    return (
        <section style={{ padding: "22px 0px 22px 22px", columnGap: '12px', display: "flex" }}>
            <div style={{ width: "74%" }}>
                <Transaction />

                <Payment />
            </div>
            {/* <div > */}
            <Sidebar style={{ width: '26%' }} />
            {/* </div> */}
        </section>
    )
}
