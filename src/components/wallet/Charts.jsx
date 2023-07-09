import React, { useEffect, useState } from 'react'
import ReactECharts from "echarts-for-react";
import { useTranslation } from 'react-i18next';

export default function Charts({ data }) {
    const [options, setOptions] = useState({})
    const { t } = useTranslation();
    const ay = []
    useEffect(() => {
        t('month', { returnObjects: true }).map((month) => ay.push(month))
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
                data: ['Data'],
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
                    data: ay
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Data',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: data && data.map((item) => item.amount)
                }
            ]
        };

        setOptions(option)
        console.log('render');

    }, [data])

    return (
        <div style={{ width: '30%' }}>
            <ReactECharts option={options} />
        </div>
    )
}
