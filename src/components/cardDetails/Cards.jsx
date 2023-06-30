import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import './design/style.scss';

export default function Card() {

    const { id } = useParams();
    const [card, setCard] = useState();
    useEffect(() => {
        axios.get(`http://localhost:5500/api/getCardDetails/${id}`).then((res) => {
            console.log(res.data);
            setCard(res.data.card);
        }
        ).catch((err) => {
            console.log(err);
        }
        )
    }, [])


    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        console.log(evt.target.id);
        setState((prev) => ({ ...prev, focus: evt.target.id }));
    }

    return (
        <div className='div' style={{ width: '300px' }}>
            {
                card && <Cards
                    number={`${card.cardNumber.slice(0, 4)} **** **** ${card.cardNumber.slice(12)}`}
                    expiry={card.cardDate}
                    cvc={card.cardCvv}
                    name={card.cardName}
                />
            }

            <div>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <form>
                    <input
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="number"
                        name="cvc"
                        placeholder="Card Number"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <div
                        name="cvc"
                        id='cvc'
                        onClick={handleInputFocus}
                        onFocus={handleInputFocus}
                    >
                        ssssssssssssssss
                    </div>
                </form>
            </div>
        </div>
    )
}
