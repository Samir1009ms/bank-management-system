import React, { useEffect } from 'react'
import Transaction from '../../components/history/Transaction'
import Payment from '../../components/history/Payment'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions } from '../../store/asyncthunk/transactions-service'
import QuickTransfer from '../../components/QuickTransfer/QuickTransfer'
import Sidebar from '../../components/SideBar/Sidebar'
import Loading from '../../components/loading/Loading'
import { setLoading } from '../../store/expense/transactions-slice'

export default function History() {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.transactionsSlice.loading)

    useEffect(() => {
        // if (!loading) {
        dispatch(setLoading(true));
        //     console.log("Ss");
        //     setTimeout(() => {
        //         dispatch(setLoading(false));
        //     }, 2000);
        // }
        dispatch(getTransactions())
        // console.log("s");
    }, [dispatch])
    return (
        loading ? <Loading /> : <section style={{ padding: "22px 0px 22px 22px", columnGap: '12px', display: "flex" }}>
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
