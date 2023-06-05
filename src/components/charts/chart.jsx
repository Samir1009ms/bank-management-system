import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useSelector } from 'react-redux';
import style from "./design/style.module.scss";
import { useTranslation } from 'react-i18next';

function Charts() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    // ? theme store 
    const totalicom = useSelector((state) => state.transactionsSlice.monthData)
    let theme = useSelector((theme) => theme.themeSlice.theme)
    // console.log(totalicom);
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
    const colors = theme === 'dark' ? darkColors : lightColors;
    // console.log("asas");
    const { t } = useTranslation();

    useEffect(() => {
        const data = {
            labels: t('month', { returnObjects: true }).map((month) => month),
            datasets: [
                {
                    data: totalicom && totalicom.map((item) => item.amount),
                    fill: true,
                    borderColor: colors.border,
                    tension: 0.4,
                    backgroundColor: colors.chartBg,
                }
            ]
        };

        setChartData(data);
        setChartOptions({
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
                        color: colors.text
                    },
                    grid: {
                        color: colors.text,
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
                        callback: function (value) {
                            const number = +value;
                            if (number >= 1000) {
                                return (number / 1000).toFixed(0) + "k";
                            }
                            return number;
                        },
                        color: colors.text,
                        borderDash: [10, 10],
                        borderDashOffset: 10,
                    },
                    grid: {
                        color: colors.lineColor,
                        borderDash: [10, 10],
                        borderDashOffset: 10,
                    }
                }
            }
        });
    }, [colors.background, colors.primary, colors.text, colors.border, colors.chartBg, colors.lineColor, totalicom, t]);
    console.log('s');
    return (
        <div className={style.card}>
            <Chart type="line" className={`${style.charts}`} width='100%' height='320px' data={chartData} options={chartOptions} />
        </div>
    )
}

export default (Charts)