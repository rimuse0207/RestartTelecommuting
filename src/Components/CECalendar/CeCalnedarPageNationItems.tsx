import React from 'react';

type CeCalendarPageNationItemsprops = {
    currentItems: [];
};

const CeCalendarPageNationItems = ({ currentItems }: CeCalendarPageNationItemsprops) => {
    return (
        <div>
            {currentItems &&
                currentItems.map(item => (
                    <div>
                        <h3>Item #{item}</h3>
                    </div>
                ))}
        </div>
    );
};

export default CeCalendarPageNationItems;
