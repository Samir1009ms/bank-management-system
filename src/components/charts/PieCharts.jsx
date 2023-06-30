import React, { useState, useCallback, memo } from 'react';
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

    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', color: "white !important" }}>
            <Donut
                data={donutData}
                externalRadius={100}
                internalRadius={50}
                highlightSliceById={highlightedSlice}
                customMouseOver={handleMouseOver}
                customMouseOut={handleMouseOut}
                width={200}
            // colorSchema={["#FF8303", "#FF3231", "#FF7A00", "#FF006E", "#fff"]}
            />
            <Legend
                data={donutData}
                highlightEntryById={highlightedSlice}
            />
        </div>
    );
};

export default memo(LegendDonut);
