import React, { useEffect, useState } from 'react'
import ReactECharts from "echarts-for-react";
import { useTranslation } from 'react-i18next';
import style from "./design/chart.module.scss";
export default function Charts({ data, data2 }) {
    const [options, setOptions] = useState({})
    const { t } = useTranslation();
    const ay = []

    useEffect(() => {

        const option = {
            title: {
                text: 'Stacked Area Chart',
                show: false
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['Incomne', 'Outcome'],
                show: false
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                },
                show: false
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: t('month', { returnObjects: true }).map((month) => (month))
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: t('incom'),
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: data && data.map((item) => item.amount)
                },
                {
                    name: t('outcom'),
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: data2 && data2.map((item) => item.amount)
                }
            ]
        };
        setOptions(option)
    }, [data, t, data2])

    return (
        <div className={style.chart}>
            <ReactECharts option={options} />
        </div>
    )
}