import React, { useEffect, useState, useCallback, memo } from 'react';
import { Legend, Donut } from 'britecharts-react';

const LegendDonut = ({ data }) => {
    const [highlightedSlice, setHighlightedSlice] = useState(null);
    const donutData = data.map((item) => {
        const { cardNumber, _id, balance } = item;
        return { name: "**" + cardNumber.slice(12), _id, quantity: balance };
    });


    const handleMouseOver = useCallback((data) => {
        setHighlightedSlice(null);
    }, []);

    const handleMouseOut = useCallback(() => {
        setHighlightedSlice(null);
    }, []);

    useEffect(() => {
        // Etkinlikleri burada kullanabilirsiniz
    }, []);

    console.log("renderr");
    return (
        <div>
            <Donut
                data={donutData}
                externalRadius={150}
                internalRadius={75}
                highlightSliceById={highlightedSlice}
                customMouseOver={handleMouseOver}
                customMouseOut={handleMouseOut}
            />
            <Legend
                data={donutData}
                highlightEntryById={highlightedSlice}
            />
        </div>
    );
};

export default memo(LegendDonut);
