import React, { useEffect } from 'react'
import CardCenter from '../../components/card/CardCenter'
import { useDispatch } from 'react-redux';
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { io } from 'socket.io-client';
import CardList from '../../components/card/CardList';

export default function Card() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCard());
        const socket = io('http://localhost:3003');

        socket.on('notification', (message) => {
            dispatch(getCard());
            // setNotifications((prevNotifications) => [...prevNotifications, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);
    return (
        <section >
            <CardCenter />
            <div>
                <CardList />
            </div>
        </section>
    )
}
