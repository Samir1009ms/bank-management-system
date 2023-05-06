
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export function Charts({ money }) {
    // console.log("chartsmoney", money);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const darkColors = {
        primary: '#3E79E5',
        secondary: '#01B8E3',
        tertiary: '#A4B4CB',
        background: '#050624',
        surface: '#1B2037',
        text: '#D3E1F5',
    };

    // Light modda kullanılacak renkler
    const lightColors = {
        primary: '#007bff',
        secondary: '#6c757d',
        tertiary: '#adb5bd',
        background: '#fff',
        surface: '#f8f9fa',
        text: '#343a40',
    };


    useEffect(() => {

        // const activeColors = document.body.classList.contains('dark') ? darkColors : lightColors;
        // console.log(activeColors);
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--nav-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const bg = documentStyle.getPropertyValue('--login-bg-color');


        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
            datasets: [
                {
                    data: money && money.map((item) => item.amount),
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    tension: 0.4,
                    backgroundColor: 'bg'
                }
            ]
        };


        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: textColor
                    }
                },
                title: {
                    // display: false, 
                },
            },
            scales: {
                x: {
                    ticks: {
                        // display: false,
                        color: textColor
                    },
                    grid: {
                        color: surfaceBorder,
                        display: false,
                        borderDash: [5, 5]
                    },

                    major: {
                        enabled: true,
                        color: 'red'

                    }
                },
                y: {
                    ticks: {
                        callback: function (value, index, values) {
                            const number = +value;
                            if (number >= 1000) {
                                return (number / 1000).toFixed(0) + "k";
                            }
                            return number;
                        },
                        color: textColorSecondary,
                        borderDash: [10],
                        borderDashOffset: 10,


                    },
                    grid: {
                        color: "red",
                        borderDash: [5],
                        borderDashOffset: 5,
                    }
                }

            }
        };

        setChartData(data);
        setChartOptions(options);
        // console.log("money2", money);
    }, [money]);

    return (
        <div className="card">
            <Chart type="line" style={{ border: "1px solid blue", borderRadius: "10px", background: "#eddefd" }} width='540px' height='320px' data={chartData} options={chartOptions} />
        </div>
    )
}
