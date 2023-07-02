import React, { useEffect, useState } from 'react'
import ReactECharts from "echarts-for-react";
import EChartsReact from 'echarts-for-react';
import { useTranslation } from 'react-i18next';

export default function Charts({ data }) {


    const [options, setOptions] = useState({})
    const { t } = useTranslation();
    const ay = []

    useEffect(() => {
        t('month', { returnObjects: true }).map((month) => ay.push(month))

        console.log("rr");
        const option = {
            color: ['#37A2FF'],
            title: {
                // text: 'Gradient Stacked Area Chart'
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
                data: ['Line 1'],
                show: false
            },
            toolbox: {
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
                    nameLocation: 'end',
                    data: ay,

                }
            ],

            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Line 1',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: '#37A2FF'
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: data && data.map((item) => item.amount)
                }
            ]
        };
        setOptions(option)
    }, [data, t])


    return (
        <div style={{ width: "400px", height: "200px" }}>
            <ReactECharts option={options} />
        </div>
    )
}
