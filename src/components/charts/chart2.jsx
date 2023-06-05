
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import style from "./design/style.module.scss"
import { useTranslation } from 'react-i18next';

export default function DoughnutChartDemo({ incom, outcom }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { t } = useTranslation();

    useEffect(() => {

        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: [`${t('outcom')}`, `${t('incom')}`],
            datasets: [
                {
                    data: [outcom ? outcom : -0.1, incom ? incom : 0.1],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-300'),
                        documentStyle.getPropertyValue('--yellow-300'),
                        documentStyle.getPropertyValue('--green-200')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-200'),
                        documentStyle.getPropertyValue('--yellow-300'),
                        documentStyle.getPropertyValue('--green-100')
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
    }, [outcom, incom, t]);



    return (
        <div className={`card flex justify-content-center align-items-center w-full ${style.chart2}`}>
            <Chart type="doughnut" data={chartData} options={chartOptions} className={` w-13rem `} />
        </div>
    )
}
