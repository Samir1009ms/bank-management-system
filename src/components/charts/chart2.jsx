
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function DoughnutChartDemo({ filter }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [outgomings, setOutgomings] = useState(0)
    const [incomes, setIncomes] = useState(0)

    function transactionsData(data) {
        const arr = data && data.flatMap((e) => e.transctions)
        const outcomne = arr && arr.filter((e) => e.type !== "Incoming")
        const incomne = arr && arr.filter((e) => e.type !== "Outgoing")

        setOutgomings(outcomne && outcomne.reduce((acc, amount) => (acc + amount.amount), 0))
        setIncomes(incomne && incomne.reduce((acc, amount) => (acc + amount.amount), 0))
        console.log(arr);
    }
    useEffect(() => {
        transactionsData(filter && filter)
        // console.log(outgomings);
        // console.log(incomes);
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Incomne', 'Outcomne'],
            datasets: [
                {
                    data: [incomes, outgomings],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };
        setChartData(data);
        setChartOptions(options);
        console.log(filter);
    }, [filter, outgomings, incomes]);



    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-15rem" />
        </div>
    )
}
