import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCard } from '../../store/asyncthunk/bankCard-service';
import { io } from "socket.io-client";
import { BankCard } from "../../components/wallet/bankCards";
export function Wallet() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCard());
        const socket = io('http://localhost:3000');

        socket.on('notification', (message) => {
            dispatch(getCard());
            // setNotifications((prevNotifications) => [...prevNotifications, message]);
        });
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);
    return (
        <section style={{ color: 'var(--nav-text-color)' }}>
            <BankCard />
        </section>
    )
}