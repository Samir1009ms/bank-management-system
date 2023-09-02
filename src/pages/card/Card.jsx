import React, { useEffect } from 'react'
import CardCenter from '../../components/card/CardCenter'
import { useDispatch, useSelector } from 'react-redux';
import { getCard } from '../../store/asyncthunk/bankCard-service';
import CardList from '../../components/card/CardList';
import Loading from '../../components/loading/Loading';
import { setLoading } from '../../store/expense/bankCard-slice';

export default function Card() {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.card.loading);

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(getCard());
    }, [dispatch]);
    return (
        loading ? <Loading /> :
            <section >
                <CardCenter />
                <div>
                    <CardList />
                </div>
            </section>
    )
}
