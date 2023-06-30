import axios from 'axios';
import { use } from 'i18next';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CardDetails from '../../components/cardDetails/CardDetails';

export default function Details() {


    return (
        <main>
            <CardDetails />
        </main>
    )
}
