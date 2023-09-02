import React, { useEffect } from 'react'
import Transaction from '../../components/history/Transaction'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions } from '../../store/asyncthunk/transactions-service'
import Sidebar from '../../components/SideBar/Sidebar'
import Loading from '../../components/loading/Loading'
import { setLoading } from '../../store/expense/transactions-slice'
import { getCard } from '../../store/asyncthunk/bankCard-service'

export default function History() {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.transactionsSlice.loading)

    useEffect(() => {
        dispatch(getTransactions())
        dispatch(getCard())
        dispatch(setLoading(true));
    }, [dispatch])
    return (
        loading ? <Loading /> : <section style={{ padding: "22px 0px 0px 22px", columnGap: '12px', display: "flex" }}>
            <div style={{ width: "74%" }}>
                <Transaction />
            </div>
            <Sidebar style={{ width: '26%' }} />
        </section>
    )
}
