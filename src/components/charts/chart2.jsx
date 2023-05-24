
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import style from "./design/style.module.css"

export default function DoughnutChartDemo({ incom, outcom }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    useEffect(() => {

        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Incomne', 'Outcomne'],
            datasets: [
                {
                    data: [outcom, incom],
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
            cutout: '60%',
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: "blue"
                    }
                },
                title: {
                    // display: false,
                    color: "red"
                },
            },
            layout: {
                // border: false
            }
        };
        setChartData(data);
        setChartOptions(options);
    }, [outcom, incom]);



    return (
        <div className={`card flex justify-content-center align-items-center w-full ${style.chart2}`}>
            <Chart type="doughnut" data={chartData} options={chartOptions} className={` w-13rem `} />
        </div>
    )
}
