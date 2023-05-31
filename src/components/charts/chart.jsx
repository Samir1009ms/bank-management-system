
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux';
import style from "./design/style.module.css";

export function Charts({ money }) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    // ? theme store 
    let the = useSelector((theme) => theme.themeSlice.theme)
    // console.log(the);

    // ? dark theme
    const darkColors = {
        primary: '#3E79E5',
        secondary: '#01B8E3',
        tertiary: '#A4B4CB',
        background: 'linear-gradient(0deg, rgba(250, 251, 252, 0.1), rgba(250, 251, 252, 0.1)), linear-gradient(90deg, rgba(240, 240, 240, 0.2) 0%, rgba(240, 240, 240, 0) 100%);',
        surface: '#1B2037',
        text: '#fff',
        chartBg: 'rgba(112, 107, 107, 0.3)',
        border: "#12D0FC",
        lineColor: "rgba(102, 160, 247, 0.3)"
    };

    // ? light theme 
    const lightColors = {
        primary: '#007bff',
        secondary: '#6c757d',
        tertiary: '#adb5bd',
        background: 'linear-gradient(0deg, #FAFBFC, #FAFBFC), linear-gradient(90deg, rgba(240, 240, 240, 0.2) 0%, rgba(240, 240, 240, 0) 100%);',
        surface: '#f8f9fa',
        text: '#000',
        border: "#2888d6",
        chartBg: 'rgba(199, 213, 225, 0.3)',
        lineColor: "rgba(119, 119, 119, 0.43)"
    };

    // ? theme store dark or light
    const theme = the === 'dark' ? darkColors : lightColors;

    useEffect(() => {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
            datasets: [
                {
                    data: money && money.map((item) => item.amount),
                    fill: true,
                    borderColor: theme.border,
                    tension: 0.4,
                    backgroundColor: theme.chartBg,
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
                        color: "blue"
                    }
                },
                title: {
                    // display: false,
                    color: "red"
                },
            },
            scales: {
                x: {
                    ticks: {
                        // display: false,
                        color: theme.text
                    },
                    grid: {
                        color: theme.text,
                        display: false,
                        borderDash: [5, 5]
                    },

                    major: {
                        enabled: true,
                        color: 'red'
                    }
                },
                y: {
                    position: 'left',
                    ticks: {
                        callback: function (value, index, values) {
                            const number = +value;
                            if (number >= 1000) {
                                return (number / 1000).toFixed(0) + "k";
                            }
                            return number;
                        },
                        color: theme.text,
                        borderDash: [10, 10],
                        borderDashOffset: 10,
                    },
                    grid: {
                        color: theme.lineColor,
                        borderDash: [10, 10],
                        borderDashOffset: 10,
                    }
                }
            }
        };
        setChartData(data);
        setChartOptions(options);
    }, [money, theme.background, theme.primary, theme.text, theme.border, theme.chartBg, theme.lineColor]);

    return (
        <div className={style.card}>
            <Chart type="line" className={`${style.charts}`} width='100%' height='320px' data={chartData} options={chartOptions} />
        </div>
    )
}
