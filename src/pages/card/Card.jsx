import React, { useEffect } from 'react'
import CardCenter from '../../components/card/CardCenter'
import { useDispatch, useSelector } from 'react-redux';
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { io } from 'socket.io-client';
import CardList from '../../components/card/CardList';
import Loading from '../../components/loading/Loading';
import { setLoading } from '../../store/expense/bankCard-slice';

export default function Card() {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.card.loading);

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(getCard());
        const socket = io(window.location.origin);
        socket.on('notification', (message) => {
            dispatch(getCard());
            // setNotifications((prevNotifications) => [...prevNotifications, message]);
        });
        return () => {
            socket.disconnect();
        };
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
